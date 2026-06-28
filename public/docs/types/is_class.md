# std::is_class

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_class;
```

`std::is_class` é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>).

Verifica se `T` é um tipo de classe não-união. Fornece a constante membro `value` que é igual a `true` se `T` for um tipo de classe (mas não união). Caso contrário, `value` é igual a `false`.

Se o programa adicionar especializações para `std::is_class` ou `std::is_class_v`, o comportamento é indefinido.

### Parâmetros de template

T | \- | um tipo a ser verificado

### Template de variável auxiliar

```cpp
template< class T >
constexpr bool is_class_v = is_class<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | `true` se `T` for um tipo de classe não-união, `false` caso contrário
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para `bool`, retorna `value`
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
        template<class T>
        std::integral_constant<bool, !std::is_union<T>::value> test(int T::*);
    
        template<class>
        std::false_type test(...);
    }
    
    template<class T>
    struct is_class : decltype(detail::test<T>(nullptr)) {};
```

---

### Exemplo

Execute este código
```cpp
    #include <type_traits>
    
    struct A {};
    static_assert(std::is_class<A>::value);
    
    class B {};
    static_assert(std::is_class_v<B>);
    static_assert(not std::is_class_v<B*>);
    static_assert(not std::is_class_v<B&>);
    static_assert(std::is_class_v<const B>);
    
    enum class E {};
    static_assert(not std::is_class<E>::value);
    
    union U { class UC {}; };
    static_assert(not std::is_class_v<U>);
    static_assert(std::is_class_v<U::UC>);
    
    static_assert(not std::is_class_v<int>);
    
    static_assert(std::is_class_v<struct S>, "incomplete class");
    static_assert(std::is_class_v<class C>, "incomplete class");
    
    int main() {}
```

### Veja também

[ is_union](<#/doc/types/is_union>)(C++11) | verifica se um tipo é um tipo de união
(modelo de classe)