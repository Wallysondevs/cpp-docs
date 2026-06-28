# std::aligned_union

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< std::size_t Len, class... Types >
struct aligned_union;
(obsoleto desde C++23)
```

Fornece o tipo aninhado `type`, que é um tipo [trivial](<#/doc/named_req/TrivialType>) de [layout padrão](<#/doc/named_req/StandardLayoutType>) com um tamanho e alinhamento adequados para uso como armazenamento não inicializado para um objeto de qualquer um dos tipos listados em `Types`. O tamanho do armazenamento é de pelo menos `Len`. `std::aligned_union` também determina o requisito de alinhamento mais rigoroso (maior) entre todos os `Types` e o disponibiliza como a constante `alignment_value`.

Se sizeof...(Types) == 0 ou se qualquer um dos tipos em `Types` não for um tipo de objeto completo, o comportamento é indefinido.

É definido pela implementação se algum [alinhamento estendido](<#/doc/language/objects>) é suportado.

Se o programa adicionar especializações para `std::aligned_union`, o comportamento é indefinido.

### Tipos de membros

Nome | Definição
---|---
`type` | um tipo trivial e de layout padrão adequado para armazenamento de qualquer tipo de `Types`

### Tipos auxiliares

```cpp
template< std::size_t Len, class... Types >
using aligned_union_t = typename aligned_union<Len,Types...>::type;  // (desde C++14)
(obsoleto desde C++23)
```

### Constantes de membro

alignment_value[static] | o requisito de alinhamento mais rigoroso de todos os `Types`
(constante de membro estática pública)

### Possível implementação
```cpp
    #include <algorithm>
    
    template<std::size_t Len, class... Types>
    struct aligned_union
    {
        static constexpr std::size_t alignment_value = std::max({alignof(Types)...});
    
        struct type
        {
            alignas(alignment_value) char _s[std::max({Len, sizeof(Types)...})];
        };
    };
```

---

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string>
    #include <type_traits>
    
    int main()
    {
        std::cout << sizeof(std::aligned_union_t<0, char>) << ' ' // 1
                  << sizeof(std::aligned_union_t<2, char>) << ' ' // 2
                  << sizeof(std::aligned_union_t<2, char[3]>) << ' ' // 3 (!)
                  << sizeof(std::aligned_union_t<3, char[4]>) << ' ' // 4
                  << sizeof(std::aligned_union_t<1, char, int, double>) << ' '    // 8
                  << sizeof(std::aligned_union_t<12, char, int, double>) << '\n'; // 16 (!)
    
        using var_t = std::aligned_union<16, int, std::string>;
    
        std::cout << "var_t::alignment_value = " << var_t::alignment_value << '\n'
                  << "sizeof(var_t::type) = " << sizeof(var_t::type) << '\n';
    
        var_t::type aligned_storage;
        int* int_ptr = new(&aligned_storage) int(42); // placement new
        std::cout << "*int_ptr = " << *int_ptr << '\n';
    
        std::string* string_ptr = new(&aligned_storage) std::string("bar");
        std::cout << "*string_ptr = " << *string_ptr << '\n';
        *string_ptr = "baz";
        std::cout << "*string_ptr = " << *string_ptr << '\n';
        string_ptr->~basic_string();
    }
```

Saída possível:
```
    1 2 3 4 8 16
    var_t::alignment_value = 8
    sizeof(var_t::type) = 32
    *int_ptr = 42
    *string_ptr = bar
    *string_ptr = baz
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2979](<https://cplusplus.github.io/LWG/issue2979>) | C++11 | tipo completo não era exigido | exige tipos completos

### Veja também

[ alignment_of](<#/doc/types/alignment_of>)(C++11) | obtém os requisitos de alinhamento do tipo
(modelo de classe)
[ aligned_storage](<#/doc/types/aligned_storage>)(desde C++11)(obsoleto desde C++23) | define o tipo adequado para uso como armazenamento não inicializado para tipos de um determinado tamanho
(modelo de classe)