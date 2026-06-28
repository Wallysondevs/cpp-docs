# std::is_floating_point

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_floating_point;
```

`std::is_floating_point` é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>).

Verifica se `T` é um tipo de ponto flutuante. Fornece a constante membro value que é igual a true, se `T` for o tipo float, double, long double, ou qualquer tipo de ponto flutuante estendido ([std::float16_t](<#/doc/types/floating-point>), [std::float32_t](<#/doc/types/floating-point>), [std::float64_t](<#/doc/types/floating-point>), [std::float128_t](<#/doc/types/floating-point>), ou [std::bfloat16_t](<#/doc/types/floating-point>))(desde C++23), incluindo quaisquer variantes cv-qualificadas. Caso contrário, value é igual a false.

Se o programa adicionar especializações para `std::is_floating_point` ou `std::is_floating_point_v`, o comportamento é indefinido.

### Parâmetros de template

- **T** — um tipo a ser verificado

### Template de variável auxiliar

```cpp
template< class T >
constexpr bool is_floating_point_v = is_floating_point<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `T` for um tipo de ponto flutuante (possivelmente cv-qualificado), false caso contrário
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

### Possível implementação
```cpp
    template<class T>
    struct is_floating_point
         : std::integral_constant<
             bool,
             // Note: standard floating-point types
             std::is_same<float, typename std::remove_cv<T>::type>::value
             || std::is_same<double, typename std::remove_cv<T>::type>::value
             || std::is_same<long double, typename std::remove_cv<T>::type>::value
             // Note: extended floating-point types (C++23, if supported)
             || std::is_same<std::float16_t, typename std::remove_cv<T>::type>::value
             || std::is_same<std::float32_t, typename std::remove_cv<T>::type>::value
             || std::is_same<std::float64_t, typename std::remove_cv<T>::type>::value
             || std::is_same<std::float128_t, typename std::remove_cv<T>::type>::value
             || std::is_same<std::bfloat16_t, typename std::remove_cv<T>::type>::value
         > {};
```

---

### Exemplo

Execute este código
```cpp
    #include <type_traits>
    
    class A {};
    static_assert(!std::is_floating_point_v<A>);
    
    static_assert(std::is_floating_point_v<float>);
    static_assert(!std::is_floating_point_v<float&>);
    static_assert(std::is_floating_point_v<double>);
    static_assert(!std::is_floating_point_v<double&>);
    static_assert(!std::is_floating_point_v<int>);
    
    int main() {}
```

### Veja também

[ is_iec559](<#/doc/types/numeric_limits/is_iec559>)[static] | identifica os tipos de ponto flutuante IEC 559/IEEE 754
(constante membro estática pública de `std::numeric_limits<T>`)
[ is_integral](<#/doc/types/is_integral>)(C++11) | verifica se um tipo é um tipo integral
(template de classe)
[ is_arithmetic](<#/doc/types/is_arithmetic>)(C++11) | verifica se um tipo é um tipo aritmético
(template de classe)
[ floating_point](<#/doc/concepts/floating_point>)(C++20) | especifica que um tipo é um tipo de ponto flutuante
(concept)