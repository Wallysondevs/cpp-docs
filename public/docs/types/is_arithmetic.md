Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_arithmetic;
```

`std::is_arithmetic` é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>).

Se `T` é um tipo aritmético (isto é, um tipo integral ou um tipo de ponto flutuante) ou uma versão `cv-qualified` dele, fornece a constante membro `value` igual a true. Para qualquer outro tipo, `value` é false.

Se o programa adicionar especializações para `std::is_arithmetic` ou `std::is_arithmetic_v` (desde C++17), o comportamento é indefinido.

### Parâmetros de template

- **T** — um tipo a ser verificado

### Template de variável auxiliar

```cpp
template< class T >
constexpr bool is_arithmetic_v = is_arithmetic<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `T` é um tipo aritmético, false caso contrário
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para bool, retorna value
(função membro pública)
operator()(C++14) | retorna value
(função membro pública)

### Tipos membro

Type | Definição
---|---
`value_type` | bool
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Notas

Tipos aritméticos são os tipos embutidos para os quais os [operadores aritméticos](<#/doc/language/operator_arithmetic>) (`+`, `-`, `*`, `/`) são definidos (possivelmente em combinação com as conversões aritméticas usuais).

Especializações de [std::numeric_limits](<#/doc/types/numeric_limits>) são fornecidas para todos os tipos aritméticos.

### Possível implementação
```cpp
    template<class T>
    struct is_arithmetic : std::integral_constant<bool,
                                                  std::is_integral<T>::value ||
                                                  std::is_floating_point<T>::value> {};
```

---

### Exemplo

Execute este código
```cpp
    #include <atomic>
    #include <cstddef>
    #include <type_traits>
    
    class A {};
    
    enum class B : int { e };
    
    static_assert(
        std::is_arithmetic_v<bool>            == true  and
        std::is_arithmetic_v<char>            == true  and
        std::is_arithmetic_v<char const>      == true  and
        std::is_arithmetic_v<int>             == true  and
        std::is_arithmetic_v<int const>       == true  and
        std::is_arithmetic_v<float>           == true  and
        std::is_arithmetic_v<float const>     == true  and
        std::is_arithmetic_v<std::size_t>     == true  and
    
        std::is_arithmetic_v<char&>           == false and
        std::is_arithmetic_v<char*>           == false and
        std::is_arithmetic_v<int&>            == false and
        std::is_arithmetic_v<int*>            == false and
        std::is_arithmetic_v<float&>          == false and
        std::is_arithmetic_v<float*>          == false and
        std::is_arithmetic_v<A>               == false and
        std::is_arithmetic_v<B>               == false and
        std::is_arithmetic_v<decltype(B::e)>  == false and
        std::is_arithmetic_v<std::byte>       == false and
        std::is_arithmetic_v<std::atomic_int> == false
    );
    
    int main() {}
```

### Veja também

[ is_integral](<#/doc/types/is_integral>)(C++11) | verifica se um tipo é um tipo integral
(modelo de classe)
[ is_floating_point](<#/doc/types/is_floating_point>)(C++11) | verifica se um tipo é um tipo de ponto flutuante
(modelo de classe)