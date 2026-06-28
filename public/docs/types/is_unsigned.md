# std::is_unsigned

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_unsigned;
```

`std::is_unsigned` é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>).

Verifica se `T` é um tipo aritmético sem sinal.

*   Se [std::is_arithmetic](<#/doc/types/is_arithmetic>)&lt;T&gt;::value for true, fornece a constante membro `value` igual a T(0) < T(-1).
*   Caso contrário, fornece a constante membro `value` igual a false.

Se o programa adicionar especializações para `std::is_unsigned` ou `std::is_unsigned_v`, o comportamento é indefinido.

### Parâmetros de template

- **T** — um tipo a ser verificado

### Template de variável auxiliar

```cpp
template< class T >
constexpr bool is_unsigned_v = is_unsigned<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `T` for um tipo integral sem sinal, false caso contrário
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para bool, retorna `value`
(função membro pública)
operator()(C++14) | retorna `value`
(função membro pública)

### Tipos membro

Type | Definição
---|---
`value_type` | bool
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Possível implementação
```cpp
    namespace detail
    {
        template<typename T,bool = std::is_arithmetic<T>::value>
        struct is_unsigned : std::integral_constant<bool, T(0) < T(-1)> {};
    
        template<typename T>
        struct is_unsigned<T,false> : std::false_type {};
    } // namespace detail
    
    template<typename T>
    struct is_unsigned : detail::is_unsigned<T>::type {};
```

---

### Exemplo

Run this code
```cpp
    #include <iostream>
    #include <type_traits>
    
    class A {};
    static_assert(std::is_unsigned_v<A> == false);
    
    enum B : unsigned {};
    static_assert(std::is_unsigned_v<B> == false);
    
    enum class C : unsigned {};
    static_assert(std::is_unsigned_v<C> == false);
    
    struct S { unsigned p : 1; int q : 1; };
    static_assert
    (
        std::is_unsigned_v<decltype(S::p)> not_eq
        std::is_unsigned_v<decltype(S::q)>
    );
    
    static_assert
    (
        std::is_unsigned_v<float> == false &&
        std::is_unsigned_v<signed int> == false &&
        std::is_unsigned_v<unsigned int> == true &&
        std::is_unsigned_v<bool> == true
    );
    
    int main() 
    {
        std::cout << std::boolalpha << std::is_unsigned<char>::value << '\n';
    }
```

Saída possível:
```
    false
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2197](<https://cplusplus.github.io/LWG/issue2197>) | C++11 | `value` poderia ser true mesmo se `T` não fosse um tipo aritmético | só pode ser false neste caso

### Veja também

[ is_signed](<#/doc/types/is_signed>)(C++11) | verifica se um tipo é um tipo aritmético com sinal
(template de classe)
[ is_signed](<#/doc/types/numeric_limits/is_signed>)[static] | identifica tipos com sinal
(constante membro estática pública de `std::numeric_limits<T>`)
[ is_arithmetic](<#/doc/types/is_arithmetic>)(C++11) | verifica se um tipo é um tipo aritmético
(template de classe)
[ make_signed](<#/doc/types/make_signed>)(C++11) | obtém o tipo com sinal correspondente para o tipo integral fornecido
(template de classe)
[ make_unsigned](<#/doc/types/make_unsigned>)(C++11) | obtém o tipo com sinal correspondente para o tipo integral fornecido
(template de classe)