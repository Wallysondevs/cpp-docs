# Suporte a Coroutines (C++20)

A biblioteca de suporte a coroutines define vários tipos que fornecem suporte em tempo de compilação e em tempo de execução para [coroutines](<#/doc/language/coroutines>).

### Coroutine traits

Definido no cabeçalho `[<coroutine>](<#/doc/header/coroutine>)`
---
[ coroutine_traits](<#/doc/coroutine/coroutine_traits>)(C++20) | tipo trait para descobrir tipos promise de coroutine
(modelo de classe)

### Coroutine handle

Definido no cabeçalho `[<coroutine>](<#/doc/header/coroutine>)`
---
[ coroutine_handle](<#/doc/coroutine/coroutine_handle>)(C++20) | usado para se referir a uma coroutine suspensa ou em execução
(modelo de classe)

### Coroutines No-op

Definido no cabeçalho `[<coroutine>](<#/doc/header/coroutine>)`
---
[ noop_coroutine](<#/doc/coroutine/noop_coroutine>)(C++20) | cria um handle de coroutine que não tem efeitos observáveis quando retomada ou destruída
(função)
[ noop_coroutine_promise](<#/doc/coroutine/noop_coroutine_promise>)(C++20) | usado para coroutines sem efeitos observáveis
(classe)
[ noop_coroutine_handle](<#/doc/coroutine/coroutine_handle>)(C++20) | [std::coroutine_handle](<#/doc/coroutine/coroutine_handle>)<[std::noop_coroutine_promise](<#/doc/coroutine/noop_coroutine_promise>)>, destinado a se referir a uma coroutine no-op
(typedef)

### Awaitables triviais

Definido no cabeçalho `[<coroutine>](<#/doc/header/coroutine>)`
---
[ suspend_never](<#/doc/coroutine/suspend_never>)(C++20) | indica que uma await-expression nunca deve suspender
(classe)
[ suspend_always](<#/doc/coroutine/suspend_always>)(C++20) | indica que uma await-expression sempre deve suspender
(classe)

### Notas

[Macro de teste de funcionalidade](<#/doc/utility/feature_test>) | Valor | Padrão | Funcionalidade
---|---|---|---
[`__cpp_impl_coroutine`](<#/doc/feature_test>) | [`201902L`](<#/>) | (C++20) | [Coroutines](<#/doc/language/coroutines>) (suporte do compilador)
[`__cpp_lib_coroutine`](<#/doc/feature_test>) | [`201902L`](<#/>) | (C++20) | [Coroutines](<#/doc/coroutine>) (suporte da biblioteca)
[`__cpp_lib_generator`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | std::generator: gerador de coroutine síncrono para [ranges](<#/doc/ranges>)

### Ver também

[ generator](<#/doc/coroutine/generator>)(C++23) | Uma [`view`](<#/doc/ranges/view>) que representa um gerador de [coroutine](<#/doc/language/coroutines>) síncrono
(modelo de classe)