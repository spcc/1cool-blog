# 6.1 权限架构处理 - 用户权限处理

整个用户相关的模块分为三部分：

1. 员工管理
2. 角色列表
3. 权限列表

---

整个章节所实现的功能有：

1. 用户列表分页展示
2. `excel` 导入用户
3. 用户列表导出为 `excel`
4. 用户详情的表格展示
5. 用户详情表格打印
6. 用户删除

---

## 1. 用户列表分页展示

1). 获取分页数据  
2). el-table 渲染数据

---

1. 创建 `api/user-manage` 文件，用于定义接口

:::details 点击查看代码

```js
import request from '@/utils/request'

/**
 * 获取用户列表数据
 */
export const getUserManageList = data => {
  return request({
    url: '/user-manage/list',
    params: data
  })
}
```

:::

2. 在 `user-manage/index.vue` 中获取对应数据并渲染视图

:::details 点击查看代码

```vue
<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-button type="primary"> {{ $t('excel.importExcel') }}</el-button>
        <el-button type="success">
          {{ $t('excel.exportExcel') }}
        </el-button>
      </div>
    </el-card>
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="#" type="index" />
        <el-table-column prop="username" :label="$t('excel.name')">
        </el-table-column>
        <el-table-column prop="mobile" :label="$t('excel.mobile')">
        </el-table-column>
        <el-table-column :label="$t('excel.avatar')" align="center">
          <template v-slot="{ row }">
            <el-image
              class="avatar"
              :src="row.avatar"
              :preview-src-list="[row.avatar]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column :label="$t('excel.role')">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="mini">{{
                item.title
              }}</el-tag>
            </div>
            <div v-else>
              <el-tag size="mini">{{ $t('excel.defaultRole') }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="openTime" :label="$t('excel.openTime')">
        </el-table-column>
        <el-table-column :label="$t('excel.action')" fixed="right" width="260">
          <template #default>
            <el-button type="primary" size="mini">{{
              $t('excel.show')
            }}</el-button>
            <el-button type="info" size="mini">{{
              $t('excel.showRole')
            }}</el-button>
            <el-button type="danger" size="mini">{{
              $t('excel.remove')
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getUserManageList } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'

// 数据相关
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(2)
// 获取数据的方法
const getListData = async () => {
  const result = await getUserManageList({
    page: page.value,
    size: size.value
  })
  tableData.value = result.list
  total.value = result.total
}
getListData()
// 监听语言切换
watchSwitchLang(getListData)

// 分页相关
/**
 * size 改变触发
 */
const handleSizeChange = currentSize => {
  size.value = currentSize
  getListData()
}

/**
 * 页码改变触发
 */
const handleCurrentChange = currentPage => {
  page.value = currentPage
  getListData()
}
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  ::v-deep .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  ::v-deep .el-tag {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
```

:::

## 2. 过滤器 和 全局过滤器

在 `Vue3`中取消了 [过滤器的概念](https://v3-migration.vuejs.org/breaking-changes/filters.html)，其中：

1. 局部过滤器被完全删除
2. 全局过滤器虽然被移除，但是可以使用 [全局属性](https://v3.cn.vuejs.org/api/application-config.html#globalproperties) 进行替代

## 3. 全局属性处理时间展示问题

1. 时间处理部分我们通过 [Day.js](https://dayjs.gitee.io/zh-CN/) 进行处理

2. 下载 [Day.js](https://dayjs.gitee.io/zh-CN/)

```sh
npm i dayjs@1.10.6
```

3. 创建 `src/filters/index.js` 文件夹，用于定义 [全局属性](https://v3.cn.vuejs.org/api/application-config.html#globalproperties)

:::details 点击查看代码

```js
import dayjs from 'dayjs'

const dateFilter = (val, format = 'YYYY-MM-DD') => {
  if (!isNaN(val)) {
    val = parseInt(val)
  }

  return dayjs(val).format(format)
}

export default app => {
  app.config.globalProperties.$filters = {
    dateFilter
  }
}
```

:::

4. 在 `main.js` 中导入

:::details 点击查看代码

```js
// filter
import installFilter from '@/filters'

installFilter(app)
```

:::

5. 在 `user-manage/index.vue` 中使用全局属性处理时间解析

:::details 点击查看代码

```html
<el-table-column :label="$t('excel.openTime')">
  <template #default="{ row }">
    {{ $filters.dateFilter(row.openTime) }}
  </template>
</el-table-column>
```

:::

## 4. excel 导入原理与实现分析

页面提供了两种导入形式:

- 点击按钮上传 `excel`
- 拖入指定区域上传 `excel`

### 4.1 excel 上传跳转页面

点击 excel `上传按钮` 完成页面跳转即可，在 `views/user-manage/index.vue` 中：

:::details 点击查看代码

```vue
<el-button @click="onImportExcelClick">{{ $t('excel.importExcel') }}</el-button>

<script>
import { useRouter } from 'vue-router'
const router = useRouter()

// excel 导入点击事件
const onImportExcelClick = () => router.push('/user/import')
</script>
```

:::

### 4.2 提供两种文件导入形式

1. 创建 `components/UploadExcel/index.vue` 组件，用于处理上传 `excel` 相关的问题

2. 在 `/views/import/index.vue` 中导入该组件

:::details 点击查看代码

```vue
<script setup>
import UploadExcel from '@/components/UploadExcel'
</script>

<template>
  <UploadExcel />
</template>
```

:::

3. `components/UploadExcel/index.vue` 处理样式问题

:::details 点击查看代码

```vue
<script setup></script>

<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button :loading="loading" type="primary" @click="handleUpload">
        {{ $t('uploadExcel.upload') }}
      </el-button>
    </div>

    <input
      ref="excelUploadInput"
      class="excel-upload-input"
      type="file"
      accept=".xlsx, .xls"
      @change="handleChange"
    />
    <!-- https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API -->
    <div
      class="drop"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover"
    >
      <i class="el-icon-upload" />
      <span>{{ $t('uploadExcel.drop') }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #bbb;
    i {
      font-size: 60px;
      display: block;
    }
  }
}
</style>
```

:::

### 4.3 文件选择之后的数据解析处理

`components/UploadExcel/index.vue`

解析的方式根据我们的导入形式的不同也可以分为两种：

1. 文件选择（选择隐藏域）导入
2. 文件拖拽导入

---

#### 4.31 文件选择（选择隐藏域）导入

1. 解析 `excel` 数据我们需要使用 [xlsx](https://www.npmjs.com/package/xlsx)

```sh
npm i xlsx@0.17.0
```

2. `components/uploadFile/index.vue`

:::details 点击查看代码

```vue
<script setup>
import XLSX from 'xlsx'
import { getHeaderRow } from './utils'

const props = defineProps({
  // 上传前回调
  beforeUpload: Function,
  // 成功回调
  onSuccess: Function
})

/**
 * 点击上传触发
 */
const loading = ref(false)
const excelUploadInput = ref(null)
const handleUpload = () => {
  excelUploadInput.value.click()
}
const handleChange = e => {
  const files = e.target.files
  const rawFile = files[0] // only use files[0]
  if (!rawFile) return
  upload(rawFile)
}

/**
 * 触发上传事件
 */
const upload = rawFile => {
  excelUploadInput.value.value = null
  // 如果没有指定上传前回调的话
  if (!props.beforeUpload) {
    readerData(rawFile)
    return
  }
  // 如果指定了上传前回调，那么只有返回 true 才会执行后续操作
  const before = props.beforeUpload(rawFile)
  if (before) {
    readerData(rawFile)
  }
}

/**
 * 读取数据（异步）
 */
const readerData = rawFile => {
  loading.value = true
  return new Promise((resolve, reject) => {
    // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
    const reader = new FileReader()
    // 该事件在读取操作完成时触发
    // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/onload
    reader.onload = e => {
      // 1. 获取解析到的数据
      const data = e.target.result
      // 2. 利用 XLSX 对数据进行解析
      const workbook = XLSX.read(data, { type: 'array' })
      // 3. 获取第一张表格(工作簿)名称
      const firstSheetName = workbook.SheetNames[0]
      // 4. 只读取 Sheet1（第一张表格）的数据
      const worksheet = workbook.Sheets[firstSheetName]
      // 5. 解析数据表头 `getHeaderRow` 为 `xlsx` 解析表头数据的通用方法，直接使用即可
      const header = getHeaderRow(worksheet)
      // 6. 解析数据体
      const results = XLSX.utils.sheet_to_json(worksheet)
      // 7. 传入解析之后的数据
      generateData({ header, results })
      // 8. loading 处理
      loading.value = false
      // 9. 异步完成
      resolve()
    }
    // 启动读取指定的 Blob 或 File 内容
    reader.readAsArrayBuffer(rawFile)
  })
}

/**
 * 根据导入内容，生成数据
 */
const generateData = excelData => {
  props.onSuccess && props.onSuccess(excelData)
}
</script>
```

:::

3. 新建 `components/uploadFile/utils.js`

:::details 点击查看代码

```js
import XLSX from 'xlsx'
/**
 * 获取表头（通用方式）
 */
export const getHeaderRow = sheet => {
  const headers = []
  const range = XLSX.utils.decode_range(sheet['!ref'])
  let C
  const R = range.s.r
  /* start in the first row */
  for (C = range.s.c; C <= range.e.c; ++C) {
    /* walk every column in the range */
    const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
    /* find the cell in the first row */
    let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
    headers.push(hdr)
  }
  return headers
}
```

:::

4. 在 `import/index.vue` 组件中传入 `onSuccess` 事件，获取解析成功之后的 `excel` 数据

:::details 点击查看代码

```vue
<template>
  <upload-excel :onSuccess="onSuccess"></upload-excel>
</template>

<script setup>
import UploadExcel from '@/components/UploadExcel'

/**
 * 数据解析成功之后的回调
 */
const onSuccess = excelData => {
  console.log(excelData)
}
</script>
```

:::

#### 4.32 文件拖入之后的数据解析处理

**文件拖入**: 需要了解[HTML_Drag_and_Drop（HTML 拖放 API）](https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API) 事件

主要使用到其中三个事件：

1. [drop (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Document/drop_event)：当元素或选中的文本在可释放目标上被释放时触发
2. [dragover (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Document/dragover_event)：当元素或选中的文本被拖到一个可释放目标上时触发
3. [dragenter (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Document/dragenter_event)：当拖拽元素或选中的文本到一个可释放目标时触发

---

1. `components/UploadFile/index.vue`

:::details 点击查看代码

```vue
<script setup>
...
import { getHeaderRow, isExcel } from './utils'
...
/**
 * 拖拽文本释放时触发
 */
const handleDrop = e => {
  // 上传中跳过
  if (loading.value) return
  const files = e.dataTransfer.files
  if (files.length !== 1) {
    ElMessage.error('必须要有一个文件')
    return
  }
  const rawFile = files[0]
  if (!isExcel(rawFile)) {
    ElMessage.error('文件必须是 .xlsx, .xls, .csv 格式')
    return false
  }
  // 触发上传事件
  upload(rawFile)
}

/**
 * 拖拽悬停时触发
 */
const handleDragover = e => {
  // https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer/dropEffect
  // 在新位置生成源项的副本
  e.dataTransfer.dropEffect = 'copy'
}

...
</script>
```

:::

2. 在 `components/UploadFile/utils.js` 中生成 `isExcel` 方法

:::details 点击查看代码

```js
export const isExcel = file => {
  return /\.(xlsx|xls|csv)$/.test(file.name)
}
```

:::

### 4.4 传递解析后的 excel 数据

1. 定义 `api/user-manage` 上传接口

:::details 点击查看代码

```js
/**
 * 批量导入
 */
export const userBatchImport = data => {
  return request({
    url: '/user-manage/batch/import',
    method: 'POST',
    data
  })
}
```

:::

2. 创建 `import/utils.js` 文件

在 `onSuccess` 中调用接口上传数据需注意：

- `header` 头不需要上传
- `results` 中 `key` 为中文，我们必须要按照接口要求进行上传

所以我们需要处理 `results` 中的数据结构

:::details 点击查看代码

```js
/**
 * 导入数据对应表
 */
export const USER_RELATIONS = {
  姓名: 'username',
  联系方式: 'mobile',
  角色: 'role',
  开通时间: 'openTime'
}
```

:::

3. 创建数据解析方法，生成新数组

`import/index.vue`

:::details 点击查看代码

```js
/**
 * 筛选数据
 */
const generateData = results => {
  const arr = []
  results.forEach(item => {
    const userInfo = {}
    Object.keys(item).forEach(key => {
      userInfo[USER_RELATIONS[key]] = item[key]
    })
    arr.push(userInfo)
  })
  return arr
}
```

:::

4. 完成数据上传即可

`import/index.vue`

:::details 点击查看代码

```js
import { useRouter } from 'vue-router'
import i18n from '@/i18n'
import { userBatchImport } from '@/api/user-manage'
import UploadExcel from '@/components/UploadExcel/index.vue'
import { USER_RELATIONS } from './utils'

const router = useRouter()
/**
 * 数据解析成功之后的回调
 */
const onSuccess = async ({ results }) => {
  const updateData = generateData(results)
  await userBatchImport(updateData)
  ElMessage.success({
    message: results.length + i18n.t('excel.importSuccess'),
    type: 'success'
  })
  router.push('/user/manage')
}
```

:::

### 4.5 处理剩余 bug

1. 上传之后的时间解析错误
2. 返回用户列表之后，数据不会自动刷新

#### 4.51 上传之后的时间解析错误

导致该问题出现的原因是因为 **excel 导入解析时间会出现错误，** 处理的方案也很简单，是一个固定方案，我们只需要进行固定的时间解析处理即可：

1. 在 `import/utils.js` 中新增事件处理方法（固定方式直接使用即可）

:::details 点击查看代码

```js
/**
 * 解析 excel 导入的时间格式
 */
export const formatDate = numb => {
  const time = new Date((numb - 1) * 24 * 3600000 + 1)
  time.setYear(time.getFullYear() - 70)
  const year = time.getFullYear() + ''
  const month = time.getMonth() + 1 + ''
  const date = time.getDate() - 1 + ''
  return (
    year +
    '-' +
    (month < 10 ? '0' + month : month) +
    '-' +
    (date < 10 ? '0' + date : date)
  )
}
```

:::

2. 在 `generateData` 中针对 `openTime` 进行单独处理

`import/index.vue`

:::details 点击查看代码

```js
/**
* 筛选数据
*/
const generateData = results => {
  ...
    Object.keys(item).forEach(key => {
      if (USER_RELATIONS[key] === 'openTime') {
        userInfo[USER_RELATIONS[key]] = formatDate(item[key])
        return
      }
      userInfo[USER_RELATIONS[key]] = item[key]
    })
    ...
  })
  return arr
}
```

:::

#### 4.52 返回用户列表之后，数据不会自动刷新

出现该问题的原因是因为：**`appmain` 中使用 `keepAlive` 进行了组件缓存**。

解决的方案也很简单，只需要：**监听 [onActivated](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html#activated) 事件，重新获取数据即可**

在 `user-manage` 中：

```js
// 处理导入用户后数据不重新加载的问题
onActivated(getListData)
```

## 5. 用户删除

1. 在 `api/user-manage.js` 中指定删除接口

:::details 点击查看代码

```js
/**
 * 删除指定数据
 */
export const deleteUser = id => {
  return request({
    url: `/user-manage/delete/${id}`
  })
}
```

:::

2. 在 `views/user-manage/index.vue` 中调用删除接口接口

:::details 点击查看代码

```html
<template #default="{ row }">
  <el-button type="danger" size="small" @click="onRemoveClick(row)">
    {{ $t('excel.remove') }}
  </el-button>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'
  import { getUserManageList, deleteUser } from '@/api/user-manage'

  /**
   * 删除按钮点击事件
   */
  const i18n = useI18n()
  const onRemoveClick = row => {
    // eslint-disable-next-line no-undef
    ElMessageBox.confirm(
      i18n.t('excel.dialogTitle1') +
        row.username +
        i18n.t('excel.dialogTitle2'),
      {
        type: 'warning'
      }
    ).then(async () => {
      await deleteUser({ id: row.id })
      ElMessage.success(i18n.t('excel.removeSuccess'))
      // 重新渲染数据
      getListData()
    })
  }
</script>
```

:::

## 6. excel 导出原理与实现分析

## 6.1 Export2Excel 弹出层组件

1. 创建 `views/user-manage/components/Export2Excel.vue`

:::details 点击查看代码

```vue
<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])

/**
 * 导出按钮点击事件
 */
const onConfirm = async () => {
  closed()
}

/**
 * 关闭
 */
const closed = () => {
  emits('update:modelValue', false)
}
</script>

<template>
  <el-dialog
    :title="$t('excel.title')"
    :model-value="modelValue"
    @close="closed"
    width="30%"
  >
    <el-input :placeholder="$t('excel.placeholder')"></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('excel.close') }}</el-button>
        <el-button type="primary" @click="onConfirm">{{
          $t('excel.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>
```

:::

2. 在 `views/user-manage/index.vue` 中进行导入 `Export2Excel.vue` 组件

:::details 点击查看代码

```vue
<script setup>
// 2. 导入 `ExportToExcel` 组件
import ExportToExcel from './components/Export2Excel.vue'

// 3. 点击事件处理函数
/**
 * excel 导出点击事件
 */
const exportToExcelVisible = ref(false)
const onToExcelClick = () => {
  exportToExcelVisible.value = true
}
</script>

<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <!-- 1. 指定 `excel`按钮 点击事件 -->
        <el-button type="success" @click="onToExcelClick">
          {{ $t('excel.exportExcel') }}
        </el-button>
      </div>
    </el-card>

    <!-- 2. 导入 `ExportToExcel` 组件  -->
    <ExportToExcel v-model="exportToExcelVisible" />
  </div>
</template>
```

:::

## 6.2 导出前置业务处理

- 指定 `input` 默认导出文件名称
- 定义 **获取全部用户** 列表接口，并调用

---

### 6.21 指定 `input` 默认导出文件名称

`views/user-manage/components/Export2Excel.vue`

:::details 点击查看代码

```vue
<template>
  <!-- 指定 `input` 的双向绑定 -->
  <el-input v-model="excelName"></el-input>
</template>

<script>
// 指定默认文件名
import { useI18n } from 'vue-i18n'
import useAppStore from '@/stores/app'

const i18n = useI18n()
const appStore = useAppStore()

let exportDefaultName = i18n.t('excel.defaultName')
const excelName = ref('')
excelName.value = exportDefaultName

// 处理国际化
watch(
  () => appStore.language,
  () => {
    exportDefaultName = i18n.t('excel.defaultName')
    excelName.value = exportDefaultName
  }
)
</script>
```

:::

### 6.22 定义 **获取全部用户** 列表接口，并调用

1. 在 `/api/user-manage.js` 中定义获取全部数据接口

:::details 点击查看代码

```js
/**
 * 获取所有用户列表数据
 */
export const getUserManageAllList = () => {
  return request({
    url: '/user-manage/all-list'
  })
}
```

:::

2. 调用接口数据，并指定 `loading`

:::details 点击查看代码

```vue
<script setup>
import { getUserManageList } from '@/api/user-manage'

/**
 * 导出按钮点击事件
 */
const loading = ref(false)
const onConfirm = async () => {
  loading.value = true
  const allUser = (await getUserManageList({ page: 1, size: 9999 })).list
  closed()
}

/**
 * 关闭
 */
const closed = () => {
  loading.value = false
  emits('update:modelValue', false)
}
</script>

<template>
  <el-button type="primary" :loading="loading" @click="onConfirm">{{
    $t('excel.confirm')
  }}</el-button>
</template>
```

:::

## 6.3 实现 excel 导出逻辑

- 将 `json` 结构数据转化为 `excel` 数据（搜索 Export2Excel 可以得到超级多的解决方案）
- 下载对应的 `excel` 数据

有了 `Export2Excel.js` 的代码之后 ，接下来还需要导入两个依赖库：

1.  [xlsx](https://www.npmjs.com/package/xlsx) （已下载）：`excel` 解析器和编译器
2.  [file-saver](https://www.npmjs.com/package/file-saver)：文件下载工具，通过 `npm i file-saver@2.0.5` 下载

---

1. 动态导入 `Export2Excel.js`

```js
// 导入工具包
const excel = await import('@/utils/Export2Excel')
```

2. 因为从服务端获取到的为 `json 数组对象` 结构，但是导出时的数据需要为 **二维数组**，所以我们需要有一个方法来把 **`json` 结构转化为 二维数组**

创建 `views/user-manage/components/Export2ExcelConstants.js` 中英文对照表

:::details 点击查看代码

```js
/**
 * 导入数据对应表
 */
export const USER_RELATIONS = {
  姓名: 'username',
  联系方式: 'mobile',
  角色: 'role',
  开通时间: 'openTime'
}
```

:::

3. 创建数据解析方法

:::details 点击查看代码

```js
// 该方法负责将数组转化成二维数组
const formatJson = (headers, rows) => {
  // 首先遍历数组
  // [{ username: '张三'},{},{}]  => [[’张三'],[],[]]
  return rows.map(item => {
    return Object.keys(headers).map(key => {
      // 角色特殊处理
      if (headers[key] === 'role') {
        const roles = item[headers[key]]

        return JSON.stringify(roles.map(role => role.title))
      }
      return item[headers[key]]
    })
  })
}
```

:::

4. 调用该方法，获取导出的二维数组数据

:::details 点击查看代码

```js
import { USER_RELATIONS } from './Export2ExcelConstants'

const data = formatJson(USER_RELATIONS, allUser)
```

:::

5. 调用 `export_json_to_excel` 方法，完成 `excel` 导出

:::details 点击查看代码

```js
excel.export_json_to_excel({
  // excel 表头
  header: Object.keys(USER_RELATIONS),
  // excel 数据（二维数组结构）
  data,
  // 文件名称
  filename: excelName.value || exportDefaultName,
  // 是否自动列宽
  autoWidth: true,
  // 文件类型
  bookType: 'xlsx'
})
```

:::

6. 导出时间逻辑处理

因为服务端返回的 `openTime` 格式问题，所以我们需要在 `excel` 导出时对时间格式进行单独处理

```js
// 导入时间格式处理工具
import { dateFormat } from '@/filters'

// 时间特殊处理
if (headers[key] === 'openTime') {
  return dateFormat(item[headers[key]])
}
```

## 6.4 局部打印详情原理与实现分析

[vue-print-nb](https://github.com/Power-kxLee/vue-print-nb#vue3-version) 进行局部打印

### 6.41：业务落地：获取展示数据

首先我们来获取对应的展示数据

1. 在 `api/user-manage.js` 中定义获取用户详情接口

:::details 点击查看代码

```js
/**
 * 获取用户详情
 */
export const userDetail = id => {
  return request({
    url: `/user-manage/detail/${id}`
  })
}
```

:::

2. 在 `views/user-info/index.vue` 中根据 `id` 获取接口详情数据，并进行国际化处理

:::details 点击查看代码

```vue
<script setup>
import { userDetail } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

// 数据相关
const detailData = ref({})
const getUserDetail = async () => {
  detailData.value = await userDetail(props.id)
}
getUserDetail()
// 语言切换
watchSwitchLang(getUserDetail)
</script>
```

:::

3. 因为用户详情可以会以组件的形式进行呈现，所以对于此处我们需要得到的 `id` ，可以通过 [vue-router Props 传参](https://next.router.vuejs.org/zh/guide/essentials/passing-props.html#%E5%B8%83%E5%B0%94%E6%A8%A1%E5%BC%8F) 的形式进行

指定路由表

:::details 点击查看代码

```js
{
  path: '/user/info/:id',
  name: 'userInfo',
  component: () => import('@/views/user-info/index'),
  props: true,
  meta: {
    title: 'userInfo'
  }
}
```

:::

4. 在 `views/user-manage/index.vue` 中传递用户 `id`

:::details 点击查看代码

```vue
<el-button @click="onShowClick(row._id)">
{{ $t('excel.show') }}
</el-button>

<script>
/* 查看按钮点击事件 */
const onShowClick = id => {
  router.push(`/user/info/${id}`)
}
</script>
```

:::

5. 渲染用户数据

:::details 点击查看代码

```vue
<template>
  <div class="user-info-container">
    <el-card class="print-box">
      <el-button type="primary">{{ $t('userInfo.print') }}</el-button>
    </el-card>
    <el-card>
      <div class="user-info-box">
        <!-- 标题 -->
        <h2 class="title">{{ $t('userInfo.title') }}</h2>

        <div class="header">
          <!-- 头部渲染表格 -->
          <el-descriptions :column="2" border>
            <el-descriptions-item :label="$t('userInfo.name')">{{
              detailData.username
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('userInfo.sex')">{{
              detailData.gender
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('userInfo.nation')">{{
              detailData.nationality
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('userInfo.mobile')">{{
              detailData.mobile
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('userInfo.province')">{{
              detailData.province
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('userInfo.date')">{{
              $filters.dateFilter(detailData.openTime)
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('userInfo.remark')" :span="2">
              <el-tag
                class="remark"
                size="small"
                v-for="(item, index) in detailData.remark"
                :key="index"
                >{{ item }}</el-tag
              >
            </el-descriptions-item>
            <el-descriptions-item :label="$t('userInfo.address')" :span="2">{{
              detailData.address
            }}</el-descriptions-item>
          </el-descriptions>
          <!-- 头像渲染 -->
          <el-image
            class="avatar"
            :src="detailData.avatar"
            :preview-src-list="[detailData.avatar]"
          ></el-image>
        </div>
        <div class="body">
          <!-- 内容渲染表格 -->
          <el-descriptions direction="vertical" :column="1" border>
            <el-descriptions-item :label="$t('userInfo.experience')">
              <ul>
                <li v-for="(item, index) in detailData.experience" :key="index">
                  <span>
                    {{ $filters.dateFilter(item.startTime, 'YYYY/MM') }}
                    ----
                    {{ $filters.dateFilter(item.endTime, 'YYYY/MM') }}</span
                  >
                  <span>{{ item.title }}</span>
                  <span>{{ item.desc }}</span>
                </li>
              </ul>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('userInfo.major')">
              {{ detailData.major }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('userInfo.glory')">
              {{ detailData.glory }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <!-- 尾部签名 -->
        <div class="foot">{{ $t('userInfo.foot') }}</div>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.print-box {
  margin-bottom: 20px;
  text-align: right;
}
.user-info-box {
  width: 1024px;
  margin: 0 auto;
  .title {
    text-align: center;
    margin-bottom: 18px;
  }
  .header {
    display: flex;
    ::v-deep .el-descriptions {
      flex-grow: 1;
    }
    .avatar {
      width: 187px;
      box-sizing: border-box;
      padding: 30px 20px;
      border: 1px solid #ebeef5;
      border-left: none;
    }
    .remark {
      margin-right: 12px;
    }
  }
  .body {
    ul {
      list-style: none;
      li {
        span {
          margin-right: 62px;
        }
      }
    }
  }
  .foot {
    margin-top: 42px;
    text-align: right;
  }
}
</style>
```

:::

## 6.5 局部打印功能实现

局部详情打印功能我们需要借助 [vue-print-nb](https://github.com/Power-kxLee/vue-print-nb#vue3-version)，所以首先我们需要下载该插件

```
npm i vue3-print-nb@0.1.4
```

然后利用该工具完成下载功能：

1. 指定 `printLoading`

:::details 点击查看代码

```vue
<el-button type="primary" :loading="printLoading">{{
  $t('userInfo.print')
}}</el-button>

// 打印相关 const printLoading = ref(false)
```

:::

2. 创建打印对象

:::details 点击查看代码

```js
const printObj = {
  // 打印区域
  id: 'userInfoBox',
  // 打印标题
  popTitle: 'imooc-vue-element-admin',
  // 打印前
  beforeOpenCallback(vue) {
    printLoading.value = true
  },
  // 执行打印
  openCallback(vue) {
    printLoading.value = false
  }
}
```

:::

3. 指定打印区域 `id` 匹配

```html
<div id="userInfoBox" class="user-info-box"></div>
```

4. [vue-print-nb](https://github.com/Power-kxLee/vue-print-nb#vue3-version) 以指令的形式存在，所以我们需要创建对应指令

5. 新建 `directives` 文件夹，创建 `index.js`

6. 写入如下代码

:::details 点击查看代码

```js
import print from 'vue3-print-nb'

export default app => {
  app.use(print)
}
```

:::

7. 在 `main.js` 中导入该指令

:::details 点击查看代码

```js
import installDirective from '@/directives'
installDirective(app)
```

:::

8. 将打印指令挂载到 `el-button` 中

:::details 点击查看代码

```html
<el-button type="primary" v-print="printObj" :loading="printLoading"
  >{{ $t('userInfo.print') }}</el-button
>
```

:::
