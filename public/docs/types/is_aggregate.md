# std::is_aggregate

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_aggregate;
```

`std::is_aggregate` é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>).

Se `T` é um [tipo agregado](<#/doc/language/aggregate_initialization>), fornece a constante membro `value` igual a `true`. Para qualquer outro tipo, `value` é `false`.

Se `T` é um tipo incompleto diferente de um tipo array ou `void` (possivelmente cv-qualificado), o comportamento é indefinido.

Se o programa adicionar especializações para `std::is_aggregate` ou `std::is_aggregate_v`, o comportamento é indefinido.

### Parâmetros de template

- **T** — um tipo a ser verificado

### Template de variável auxiliar

```cpp
template< class T >
constexpr bool is_aggregate_v = is_aggregate<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | `true` se `T` é um tipo agregado, `false` caso contrário
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

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_is_aggregate`](<#/doc/feature_test>) | [`201703L`](<#/>) | (C++17) | `std::is_agregate`

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cassert>
    #include <cstddef>
    #include <new>
    #include <string_view>
    #include <type_traits>
    #include <utility>
    
    // Constructs a T at the uninitialized memory pointed to by p using
    // list-initialization for aggregates and non-list initialization otherwise.
    template<class T, class... Args>
    T* construct(T* p, Args&&... args)
    {
        if constexpr (std::is_aggregate_v<T>)
            return ::new (static_cast<void*>(p)) T{std::forward<Args>(args)...};
        else
            return ::new (static_cast<void*>(p)) T(std::forward<Args>(args)...);
    }
    
    struct A { int x, y; };
    static_assert(std::is_aggregate_v<A>);
    
    struct B
    {
        int i;
        std::string_view str;
    
        B(int i, std::string_view str) : i(i), str(str) {}
    };
    static_assert(not std::is_aggregate_v<B>);
    
    template <typename... Ts>
    using aligned_storage_t = alignas(Ts...) std::byte[std::max({sizeof(Ts)...})];
    
    int main()
    {
        aligned_storage_t<A, B> storage;
    
        A& a = *construct(reinterpret_cast<A*>(&storage), 1, 2);
        assert(a.x == 1 and a.y == 2);
    
        B& b = *construct(reinterpret_cast<B*>(&storage), 3, "4");
        assert(b.i == 3 and b.str == "4");
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3823](<https://cplusplus.github.io/LWG/issue3823>) | C++17 | O comportamento é indefinido se `T` é um tipo array, mas `std::remove_all_extents_t<T>` é um tipo incompleto. | O comportamento é definido independentemente da incompletude de `std::remove_all_extents_t<T>`, desde que `T` seja um tipo array.