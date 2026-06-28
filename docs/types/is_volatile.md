# std::is_volatile

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_volatile;
```

`std::is_volatile` é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>).

Se `T` é um tipo qualificado com volatile (isto é, volatile, ou const volatile), fornece a constante membro value igual a true. Para qualquer outro tipo, value é false.

Se o programa adicionar especializações para `std::is_volatile` ou `std::is_volatile_v`, o comportamento é indefinido.

### Parâmetros de template

- **T** — um tipo para verificar

### Template de variável auxiliar

```cpp
template< class T >
constexpr bool is_volatile_v = is_volatile<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `T` é um tipo qualificado com volatile, false caso contrário
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

### Possível implementação
```cpp
    template<class T> struct is_volatile : std::false_type {};
    template<class T> struct is_volatile<volatile T> : std::true_type {};
```

---

### Exemplo

Execute este código
```cpp
    #include <type_traits>
    #include <valarray>
    
    static_assert(!std::is_volatile_v<int>);
    static_assert(std::is_volatile_v<volatile int>);
    static_assert(std::is_volatile_v<volatile const int>);
    static_assert(std::is_volatile_v<volatile std::valarray<float>>);
    static_assert(!std::is_volatile_v<std::valarray<volatile float>>);
    
    int main() {}
```

### Veja também

[is_const](<#/doc/types/is_const>)(C++11) | verifica se um tipo é qualificado com const
(template de classe)