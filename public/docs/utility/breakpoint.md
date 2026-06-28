# std::breakpoint

Definido no cabeçalho `[<debugging>](<#/doc/header/debugging>)`

```c
void breakpoint() noexcept;
```

Ponto de interrupção incondicional: Tenta parar temporariamente a execução do programa e passar o controle para o depurador, independentemente de a presença de um depurador poder ser detectada. O comportamento desta função é definido pela implementação.

### Notas

A intenção desta função é permitir o controle em tempo de execução de pontos de interrupção além do que pode estar disponível em um depurador, sem causar a saída do programa. Por exemplo, interromper quando uma condição não crítica infrequente é detectada, permitindo controle programático com condições complexas sensíveis ao tempo de execução, interromper na entrada do usuário para inspecionar o contexto em programas interativos sem a necessidade de alternar para o aplicativo depurador, etc.

Esta função padroniza muitas facilidades existentes semelhantes: [`__builtin_debugtrap`](<https://clang.llvm.org/docs/LanguageExtensions.html#builtin-debugtrap>) do LLVM, [`__debugbreak`](<https://learn.microsoft.com/en-us/cpp/intrinsics/debugbreak>) da API Win32, [`debugger_break`](<https://github.com/boostorg/test/blob/develop/include/boost/test/impl/debug.ipp#L716>) do [boost.test](<https://www.boost.org/doc/libs/release/libs/test/doc/html/index.html>), [assert](<#/doc/error/assert>)(false), _asm { int 3 } (MSVC) e asm("int3") (GCC/clang) para alvos x86, [etc](<#/doc/utility/breakpoint>).

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_debugging`](<#/doc/feature_test>) | [`202311L`](<#/>) | (C++26) | Biblioteca de suporte a depuração
[`202403L`](<#/>) | (C++26) | `std::is_debugger_present` substituível

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ is_debugger_present](<#/doc/utility/is_debugger_present>)(C++26) | verifica se um programa está sendo executado sob o controle de um depurador
(função)
[ breakpoint_if_debugging](<#/doc/utility/breakpoint_if_debugging>)(C++26) | chama std::breakpoint se std::is_debugger_present retornar true
(função)

### Links externos

1. | armKEIL: [`__breakpoint` intrinsic](<https://developer.arm.com/documentation/dui0375/g/Compiler-specific-Features/--breakpoint-intrinsic>)
---|---
2. | Snippets Portáteis: [Asserções e armadilhas de depuração](<https://github.com/nemequ/portable-snippets/tree/master/debug-trap>)
3. | EASTL: [`EASTL_DEBUG_BREAK`](<https://github.com/electronicarts/EASTL/blob/3.18.00/include/EASTL/internal/config.h#L613>)
4. | Catch2: [`CATCH_TRAP` e `CATCH_BREAK_INTO_DEBUGGER`](<https://github.com/catchorg/Catch2/blob/v3.0.0-preview4/src/catch2/internal/catch_debugger.hpp>)
5. | Unreal Engine: [`DebugBreak`](<https://docs.unrealengine.com/5.0/en-US/API/Runtime/Core/GenericPlatform/FGenericPlatformMisc/DebugBreak/>)
6. | JUCE: [`JUCE_BREAK_IN_DEBUGGER`](<https://github.com/juce-framework/JUCE/blob/6.1.5/modules/juce_core/system/juce_PlatformDefs.h#L63>)
7. | Dear ImGui: [`IM_DEBUG_BREAK`](<https://github.com/ocornut/imgui/blob/v1.86/imgui_internal.h#L257>)
8. | AWS C Common: [`aws_debug_break`](<https://github.com/awslabs/aws-c-common/blob/v0.6.19/include/aws/common/system_info.h#L55>)