# std::is_invocable, std::is_invocable_r, std::is_nothrow_invocable, std::is_nothrow_invocable_r

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class Fn, class... ArgTypes >
struct is_invocable;
template< class R, class Fn, class... ArgTypes >
struct is_invocable_r;
template< class Fn, class... ArgTypes >
struct is_nothrow_invocable;
template< class R, class Fn, class... ArgTypes >
struct is_nothrow_invocable_r;
```

1) Determina se [`_INVOKE_`](<#/doc/utility/functional>)([std::declval](<#/doc/utility/declval>)&lt;Fn&gt;(), [std::declval](<#/doc/utility/declval>)&lt;ArgTypes&gt;()...) é bem formado quando tratado como um operando não avaliado.

2) Determina se [`_INVOKE <R>_`](<#/doc/utility/functional>)([std::declval](<#/doc/utility/declval>)&lt;Fn&gt;(), [std::declval](<#/doc/utility/declval>)&lt;ArgTypes&gt;()...) é bem formado quando tratado como um operando não avaliado.

3) Determina se [`_INVOKE_`](<#/doc/utility/functional>)([std::declval](<#/doc/utility/declval>)&lt;Fn&gt;(), [std::declval](<#/doc/utility/declval>)&lt;ArgTypes&gt;()...) é bem formado quando tratado como um operando não avaliado, e é conhecido por não lançar nenhuma exceção.

4) Determina se [`_INVOKE <R>_`](<#/doc/utility/functional>)([std::declval](<#/doc/utility/declval>)&lt;Fn&gt;(), [std::declval](<#/doc/utility/declval>)&lt;ArgTypes&gt;()...) é bem formado quando tratado como um operando não avaliado, e é conhecido por não lançar nenhuma exceção.

Se `Fn, R` ou qualquer tipo no pacote de parâmetros `ArgTypes` não for um tipo completo, (possivelmente cv-qualificado) void, ou um array de limite desconhecido, o comportamento é indefinido.

Se uma instanciação de um template acima depender, direta ou indiretamente, de um tipo incompleto, e essa instanciação pudesse produzir um resultado diferente se esse tipo fosse hipoteticamente completado, o comportamento é indefinido.

Se o programa adicionar especializações para qualquer um dos templates descritos nesta página, o comportamento é indefinido.

### Helper variable templates

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class Fn, class... ArgTypes >
inline constexpr bool is_invocable_v =
std::is_invocable<Fn, ArgTypes...>::value;
template< class R, class Fn, class... ArgTypes >
inline constexpr bool is_invocable_r_v =
std::is_invocable_r<R, Fn, ArgTypes...>::value;
template< class Fn, class... ArgTypes >
inline constexpr bool is_nothrow_invocable_v =
std::is_nothrow_invocable<Fn, ArgTypes...>::value;
template< class R, class Fn, class... ArgTypes >
inline constexpr bool is_nothrow_invocable_r_v =
std::is_nothrow_invocable_r<R, Fn, ArgTypes...>::value;
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se (para sobrecarga (1)) [`_INVOKE_`](<#/doc/utility/functional>)([std::declval](<#/doc/utility/declval>)&lt;Fn&gt;(), [std::declval](<#/doc/utility/declval>)&lt;ArgTypes&gt;()...) é bem formado quando tratado como um operando não avaliado, falso caso contrário
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para bool, retorna value
(função membro pública)
operator()(C++14) | retorna value
(função membro pública)

### Tipos membro

Tipo | Definição
---|---
`value_type` | bool
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Notas

Macro de teste de funcionalidade | Valor | Std | Funcionalidade
---|---|---|---
[`__cpp_lib_is_invocable`](<#/doc/feature_test>) | [`201703L`](<#/>) | (C++17) | `std::is_invocable`, [std::invoke_result](<#/doc/types/result_of>)

### Exemplos

Execute este código
```cpp
    #include <type_traits>
    
    auto func2(char) -> int (*)()
    {
        return nullptr;
    }
    
    int main()
    {
        static_assert(std::is_invocable_v<int()>);
        static_assert(not std::is_invocable_v<int(), int>);
        static_assert(std::is_invocable_r_v<int, int()>);
        static_assert(not std::is_invocable_r_v<int*, int()>);
        static_assert(std::is_invocable_r_v<void, void(int), int>);
        static_assert(not std::is_invocable_r_v<void, void(int), void>);
        static_assert(std::is_invocable_r_v<int(*)(), decltype(func2), char>);
        static_assert(not std::is_invocable_r_v<int(*)(), decltype(func2), void>);
    }
```

### Veja também

[ invokeinvoke_r](<#/doc/utility/functional/invoke>)(C++17)(C++23) | invoca qualquer objeto [Callable](<#/doc/named_req/Callable>) com os argumentos fornecidos e possibilidade de especificar o tipo de retorno (desde C++23)
(template de função)
[ result_ofinvoke_result](<#/doc/types/result_of>)(C++11)(removido em C++20)(C++17) | deduz o tipo de resultado da invocação de um objeto invocável com um conjunto de argumentos
(template de classe)
[ declval](<#/doc/utility/declval>)(C++11) | obtém uma referência a um objeto do argumento de tipo do template para uso em um contexto não avaliado
(template de função)
[ invocableregular_invocable](<#/doc/concepts/invocable>)(C++20) | especifica que um tipo invocável pode ser invocado com um dado conjunto de tipos de argumento
(concept)