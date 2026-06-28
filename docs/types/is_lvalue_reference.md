# std::is_lvalue_reference

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_lvalue_reference;
```

`std::is_lvalue_reference` é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>).

Verifica se `T` é um tipo de referência lvalue. Fornece a constante membro `value` que é igual a `true` se `T` for um tipo de referência lvalue. Caso contrário, `value` é igual a `false`.

Se o programa adicionar especializações para `std::is_lvalue_reference` ou `std::is_lvalue_reference_v`, o comportamento é indefinido.

### Parâmetros de template

- **T** — um tipo a ser verificado

### Template de variável auxiliar

```cpp
template< class T >
constexpr bool is_lvalue_reference_v = is_lvalue_reference<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | `true` se `T` for um tipo de referência lvalue, `false` caso contrário
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
    template<class T> struct is_lvalue_reference     : std::false_type {};
    template<class T> struct is_lvalue_reference<T&> : std::true_type {};
```

---

### Exemplo

Execute este código
```cpp
    #include <type_traits>
     
    class A {};
    static_assert(std::is_lvalue_reference_v<A> == false);
    static_assert(std::is_lvalue_reference_v<A&> == true);
    static_assert(std::is_lvalue_reference_v<A&&> == false);
     
    static_assert(std::is_lvalue_reference_v<int> == false);
    static_assert(std::is_lvalue_reference_v<int&> == true);
    static_assert(std::is_lvalue_reference_v<int&&> == false);
     
    int main() {}
```

### Ver também

[ is_reference](<#/doc/types/is_reference>)(C++11) | verifica se um tipo é uma _referência lvalue_ ou _referência rvalue_
(modelo de classe)
[ is_rvalue_reference](<#/doc/types/is_rvalue_reference>)(C++11) | verifica se um tipo é uma _referência rvalue_
(modelo de classe)