# std::is_sufficiently_aligned

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< std::size_t N, class T >
bool is_sufficiently_aligned( T* ptr );
```

Verifica se o ponteiro ptr aponta para um objeto cujo alinhamento tem um valor de pelo menos N.

O comportamento é indefinido se ptr não aponta para um objeto do tipo `T` (ignorando a qualificação cv em todos os níveis).

### Valor de retorno

true se ptr aponta para um objeto que tem alinhamento de pelo menos N; caso contrário, false.

### Exceções

Não lança exceções.

### Notas

`std::is_sufficiently_aligned` pode ser usado como uma pré-condição para [std::assume_aligned](<#/doc/memory/assume_aligned>).

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_is_sufficiently_aligned`](<#/doc/feature_test>) | [`202411L`](<#/>) | (C++26) | `std::is_sufficiently_aligned`

### Possível implementação
```cpp
    template<std::size_t N, class T>
    bool is_sufficiently_aligned(T* ptr)
    {
        return std::bit_cast<std::uintptr_t>(ptr) % N == 0;
    }
```

---

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Ver também

`[alignof](<#/doc/language/alignof>)` (C++11) | consulta os requisitos de alinhamento de um tipo
(operador)
`[alignas](<#/doc/language/alignas>)` (C++11) | especifica que o armazenamento para a variável deve ser alinhado por uma quantidade específica
(especificador)
[ aligned_storage](<#/doc/types/aligned_storage>)(desde C++11)(obsoleto em C++23) | define o tipo adequado para uso como armazenamento não inicializado para tipos de determinado tamanho
(modelo de classe)
[ align](<#/doc/memory/align>)(C++11) | alinha um ponteiro em um buffer
(função)
[ aligned_accessor](<https://en.cppreference.com/mwiki/index.php?title=cpp/container/mdspan/aligned_accessor&action=edit&redlink=1> "cpp/container/mdspan/aligned accessor \(page does not exist\)")(C++26) | um tipo para acesso alinhado a elementos de `mdspan`
(modelo de classe)