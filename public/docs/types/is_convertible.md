# std::is_convertible, std::is_nothrow_convertible

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class From, class To >
struct is_convertible;
template< class From, class To >
struct is_nothrow_convertible;
```

1) Se a definição da função imaginária `To test() { return [std::declval](<#/doc/utility/declval>)<From>(); }` for bem-formada (isto é, ou [std::declval](<#/doc/utility/declval>)&lt;From&gt;() pode ser convertido para `To` usando [conversões implícitas](<#/doc/language/implicit_cast>), ou ambos `From` e `To` são `void` possivelmente cv-qualificados), fornece a constante membro `value` igual a `true`. Caso contrário, `value` é `false`. Para os propósitos desta verificação, o uso de [std::declval](<#/doc/utility/declval>) na instrução `return` não é considerado um [ODR-use](<#/doc/language/definition>). Se `To` for um tipo de referência e um [objeto temporário](<#/doc/language/reference_initialization>) seria criado ao vincular [std::declval](<#/doc/utility/declval>)&lt;From&gt;() a `To`, a instrução `return` na função imaginária é considerada bem-formada, mesmo que tal vinculação seja mal-formada em uma função real. | (desde C++26)

[Verificações de acesso](<#/doc/language/access>) são realizadas como se de um contexto não relacionado a nenhum dos tipos. Apenas a validade do contexto imediato da expressão na instrução `return` (incluindo conversões para o tipo de retorno) é considerada.

2) O mesmo que (1), mas a conversão também é `noexcept`.

Se `From` ou `To` não for um tipo completo, `void` (possivelmente cv-qualificado), ou um array de limite desconhecido, o comportamento é indefinido.

Se uma instanciação de um template acima depender, direta ou indiretamente, de um tipo incompleto, e essa instanciação pudesse produzir um resultado diferente se esse tipo fosse hipoteticamente completado, o comportamento é indefinido.

Se o programa adicionar especializações para qualquer um dos templates descritos nesta página, o comportamento é indefinido.

### Template de variável auxiliar

```cpp
template< class From, class To >
constexpr bool is_convertible_v = is_convertible<From, To>::value;  // (desde C++17)
template< class From, class To >
constexpr bool is_nothrow_convertible_v = is_nothrow_convertible<From, To>::value;  // (desde C++20)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | `true` se `From` for conversível para `To`, `false` caso contrário
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para `bool`, retorna `value`
(função membro pública)
operator()(C++14) | retorna `value`
(função membro pública)

### Tipos membro

Tipo | Definição
---|---
`value_type` | `bool`
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Possível implementação

[`is_convertible` (1)](<#/doc/types/is_convertible>)
---
```cpp
    namespace detail
    {
        template<class T>
        auto test_returnable(int) -> decltype(
            void(static_cast<T(*)()>(nullptr)), std::true_type{}
        );
        template<class>
        auto test_returnable(...) -> std::false_type;
    
        template<class From, class To>
        auto test_implicitly_convertible(int) -> decltype(
            void(std::declval<void(&)(To)>()(std::declval<From>())), std::true_type{}
        );
        template<class, class>
        auto test_implicitly_convertible(...) -> std::false_type;
    } // namespace detail
    
    template<class From, class To>
    struct is_convertible : std::integral_constant<bool,
        (decltype(detail::test_returnable<To>(0))::value &&
         decltype(detail::test_implicitly_convertible<From, To>(0))::value) ||
        (std::is_void<From>::value && std::is_void<To>::value)
    > {};
```

[`is_nothrow_convertible` (2)](<#/doc/types/is_convertible>)
```cpp
    template<class From, class To>
    struct is_nothrow_convertible : std::conjunction<std::is_void<From>, std::is_void<To>> {};
    
    template<class From, class To>
        requires
            requires
            {
                static_cast<To(*)()>(nullptr);
                { std::declval<void(&)(To) noexcept>()(std::declval<From>()) } noexcept;
            }
    struct is_nothrow_convertible<From, To> : std::true_type {};
```

### Notas

Fornece resultados bem-definidos para tipos de referência, tipos `void`, tipos de array e tipos de função.

Atualmente, o padrão não especificou se a destruição do objeto produzido pela conversão (seja um objeto resultante ou um temporário vinculado a uma referência) é considerada parte da conversão. Este é o [problema LWG 3400](<https://cplusplus.github.io/LWG/issue3400>).

Todas as implementações conhecidas tratam a destruição como parte da conversão, conforme proposto em [P0758R1](<https://wg21.link/P0758R1#Appendix>).

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_is_nothrow_convertible`](<#/doc/feature_test>) | [`201806L`](<#/>) | (C++20) | `std::is_nothrow_convertible`

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <string>
    #include <string_view>
    #include <type_traits>
    
    class E { public: template<class T> E(T&&) {} };
    
    int main()
    {
        class A {};
        class B : public A {};
        class C {};
        class D { public: operator C() { return c; } C c; };
    
        static_assert(std::is_convertible_v<B*, A*>);
        static_assert(!std::is_convertible_v<A*, B*>);
        static_assert(std::is_convertible_v<D, C>);
        static_assert(!std::is_convertible_v<B*, C*>);
        // Note that the Perfect Forwarding constructor makes the class E be
        // "convertible" from everything. So, A is replaceable by B, C, D..:
        static_assert(std::is_convertible_v<A, E>);
    
        static_assert(!std::is_convertible_v<std::string_view, std::string>);
        static_assert(std::is_convertible_v<std::string, std::string_view>);
    
        auto stringify = []<typename T>(T x)
        {
            if constexpr (std::is_convertible_v<T, std::string> or
                          std::is_convertible_v<T, std::string_view>)
                return x;
            else
                return std::to_string(x);
        };
    
        using std::operator "" s, std::operator "" sv;
        const char* three = "three";
    
        std::cout << std::quoted(stringify("one"s)) << ' '
                  << std::quoted(stringify("two"sv)) << ' '
                  << std::quoted(stringify(three)) << ' '
                  << std::quoted(stringify(42)) << ' '
                  << std::quoted(stringify(42.0)) << '\n';
    }
```

Saída:
```
    "one" "two" "three" "42" "42.000000"
```

### Veja também

[ is_base_of](<#/doc/types/is_base_of>)(C++11) | verifica se um tipo é uma base do outro tipo
(template de classe)
[ is_pointer_interconvertible_base_of](<#/doc/types/is_pointer_interconvertible_base_of>)(C++20) | verifica se um tipo é uma base (inicial) _[interconversível por ponteiro](<#/doc/language/static_cast>)_ de outro tipo
(template de classe)
[ is_pointer_interconvertible_with_class](<#/doc/types/is_pointer_interconvertible_with_class>)(C++20) | verifica se objetos de um tipo são _[interconversíveis por ponteiro](<#/doc/language/static_cast>)_ com o subobjeto especificado desse tipo
(template de função)
[ convertible_to](<#/doc/concepts/convertible_to>)(C++20) | especifica que um tipo é implicitamente conversível para outro tipo
(concept)