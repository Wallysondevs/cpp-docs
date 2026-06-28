# std::is_debugger_present

Definido no cabeçalho `[<debugging>](<#/doc/header/debugging>)`

```c
bool is_debugger_present() noexcept;
```

Tenta determinar se o programa está sendo executado com um depurador presente.

Por padrão, o comportamento desta função é completamente definido pela implementação. Um programa C++ pode fornecer a definição desta assinatura para substituir o comportamento desta função.

### Valor de retorno

A versão padrão retorna true se, de acordo com o seu melhor conhecimento, o programa estiver sendo executado sob um depurador.

### Observações

A intenção desta função é permitir a impressão de saída extra para ajudar a diagnosticar problemas, executar código de teste adicional, exibir uma interface de usuário extra para auxiliar na depuração, etc.

Esta função padroniza muitas facilidades existentes semelhantes: [`under_debugger`](<https://github.com/boostorg/test/blob/develop/include/boost/test/impl/debug.ipp#L647>) do [boost.test](<https://www.boost.org/doc/libs/release/libs/test/doc/html/index.html>), [`IsDebuggerPresent()`](<https://learn.microsoft.com/en-us/windows/win32/api/debugapi/nf-debugapi-isdebuggerpresent>) da API Win32, [`isDebuggerActive`](<https://github.com/catchorg/Catch2/blob/devel/src/catch2/internal/catch_debugger.cpp>) do [Catch2](<https://github.com/catchorg/Catch2>), [`IsDebuggerPresent`](<https://docs.unrealengine.com/5.0/en-US/API/Runtime/Core/GenericPlatform/FGenericPlatformMisc/IsDebuggerPresent/>) do [Unreal Engine](<https://www.unrealengine.com/>), etc.

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_debugging`](<#/doc/feature_test>) | [`202311L`](<#/>) | (C++26) | Biblioteca de suporte à depuração
[`202403L`](<#/>) | (C++26) | `std::is_debugger_present` substituível

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

[ breakpoint](<#/doc/utility/breakpoint>)(C++26) | pausa o programa em execução quando chamada
(função)
[ breakpoint_if_debugging](<#/doc/utility/breakpoint_if_debugging>)(C++26) | chama std::breakpoint se std::is_debugger_present retornar true
(função)