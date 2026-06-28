# std::alignment_of

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct alignment_of;
```

Fornece a constante membro value igual ao [requisito de alinhamento](<#/doc/language/objects>) do tipo `T`, como se obtido por uma expressão [`alignof`](<#/doc/language/alignof>). Se `T` for um tipo array, retorna os requisitos de alinhamento do tipo do elemento. Se `T` for um tipo referência, retorna os requisitos de alinhamento do tipo referenciado.

Se alignof(T) não for uma expressão válida, o comportamento é indefinido.

Se o programa adicionar especializações para `std::alignment_of` ou `std::alignment_of_v` (desde C++17), o comportamento é indefinido.

### Modelo de variável auxiliar

```cpp
template< class T >
constexpr std::size_t alignment_of_v = alignment_of<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | alignof(T)
(constante membro estática pública)

### Funções membro

operator std::size_t | converte o objeto para [std::size_t](<#/doc/types/size_t>), retorna value
(função membro pública)
operator()(C++14) | retorna value
(função membro pública)

### Tipos membro

Tipo | Definição
---|---
`value_type` | [std::size_t](<#/doc/types/size_t>)
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<[std::size_t](<#/doc/types/size_t>), value>

### Implementação possível
```cpp
    template<class T>
    struct alignment_of : std::integral_constant<std::size_t, alignof(T)> {};
```

---

### Notas

Este type trait precede a palavra-chave [`alignof`](<#/doc/language/alignof>), que pode ser usada para obter o mesmo valor com menos verbosidade.

### Exemplo

Execute este código
```cpp
    #include <cstdint>
    #include <iostream>
    #include <type_traits>
    
    struct A {};
    struct B
    {
        std::int8_t p;
        std::int16_t q;
    };
    
    int main()
    {
        std::cout << std::alignment_of<A>::value << ' ';
        std::cout << std::alignment_of<B>::value << ' ';
        std::cout << std::alignment_of<int>() << ' '; // alt syntax
        std::cout << std::alignment_of_v<double> << '\n'; // c++17 alt syntax
    }
```

Saída possível:
```
    1 2 4 8
```

### Veja também

`[alignof](<#/doc/language/alignof>)` (C++11) | consulta os requisitos de alinhamento de um tipo
(operador)
`[alignas](<#/doc/language/alignas>)` (C++11) | especifica que o armazenamento para a variável deve ser alinhado por uma quantidade específica
(especificador)
[ aligned_storage](<#/doc/types/aligned_storage>)(desde C++11)(obsoleto em C++23) | define o tipo adequado para uso como armazenamento não inicializado para tipos de determinado tamanho
(modelo de classe)
[ aligned_union](<#/doc/types/aligned_union>)(desde C++11)(obsoleto em C++23) | define o tipo adequado para uso como armazenamento não inicializado para todos os tipos fornecidos
(modelo de classe)
[ max_align_t](<#/doc/types/max_align_t>)(C++11) | tipo trivial com requisito de alinhamento tão grande quanto qualquer outro tipo escalar
(typedef)