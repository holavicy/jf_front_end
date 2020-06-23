<template>
    <d2-container class="page">
        <el-tabs>
      <el-tab-pane label="顶栏菜单">
        <div>顶栏菜单内容</div>
        <d2-highlight :code="JSON.stringify(header, null, 2)"/>
      </el-tab-pane>
      <el-tab-pane label="侧栏菜单">
        <div>侧栏菜单内容</div>
        <d2-highlight :code="JSON.stringify(aside, null, 2)"/>
      </el-tab-pane>
    </el-tabs>
    </d2-container>
</template>
