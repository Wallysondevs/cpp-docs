# std::is_union

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_union;
```

`std::is_union` é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>).

Verifica se `T` é um [tipo union](<#/doc/language/union>). Fornece a constante membro `value`, que é igual a `true` se `T` é um tipo union. Caso contrário, `value` é igual a `false`.

Se o programa adicionar especializações para `std::is_union` ou `std::is_union_v`, o comportamento é indefinido.

### Parâmetros de template

- **T** — um tipo a ser verificado

### Template de variável auxiliar

```cpp
template< class T >
constexpr bool is_union_v = is_union<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | `true` se `T` é um tipo union, `false` caso contrário
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

### Exemplo

Execute este código
```cpp
    #include <type_traits>
    
    struct A {};
    static_assert(!std::is_union_v<A>);
    
    typedef union
    {
        int a;
        float b;
    } B;
    static_assert(std::is_union_v<B>);
    
    struct C { B d; };
    static_assert(!std::is_union_v<C>);
    
    static_assert(!std::is_union_v<int>);
    
    int main() {}
```

### Veja também

[ is_class](<#/doc/types/is_class>)(C++11) | verifica se um tipo é um tipo de classe não-union
(modelo de classe)