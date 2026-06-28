# std::aligned_storage

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< std::size_t Len, std::size_t Align = /* default-alignment */ >
struct aligned_storage;
(obsoleto em C++23)
```

Fornece o tipo aninhado _`type`_, que satisfaz [TrivialType](<#/doc/named_req/TrivialType>) e [StandardLayoutType](<#/doc/named_req/StandardLayoutType>) e é adequado para uso como armazenamento não inicializado para qualquer objeto cujo tamanho seja no máximo `Len` e cujo [requisito de alinhamento](<#/doc/language/objects>) seja um divisor de `Align`.

O valor padrão de `Align` é o requisito de alinhamento mais rigoroso (o maior) para qualquer objeto cujo tamanho seja no máximo `Len`. Se o valor padrão não for usado, `Align` deve ser o valor de alignof(T) para algum tipo `T`, ou o comportamento é indefinido.

O comportamento é indefinido se Len == 0.

É definido pela implementação se qualquer [alinhamento estendido](<#/doc/language/objects>) é suportado.

Se o programa adicionar especializações para `std::aligned_storage`, o comportamento é indefinido.

### Tipos de membro

Nome | Definição
---|---
`type` | um tipo [trivial](<#/doc/named_req/TrivialType>) e de [layout padrão](<#/doc/named_req/StandardLayoutType>) de pelo menos tamanho `Len` com requisito de alinhamento `Align`

### Tipos auxiliares

```cpp
template< std::size_t Len, std::size_t Align = /* default-alignment */ >
using aligned_storage_t = typename aligned_storage<Len, Align>::type;  // (desde C++14)
(obsoleto em C++23)
```

### Notas

O tipo definido por `std::aligned_storage<>::type` pode ser usado para criar blocos de memória não inicializados adequados para armazenar objetos de um determinado tipo, opcionalmente alinhados de forma mais rigorosa do que seu requisito de alinhamento natural, por exemplo, em um limite de cache ou página.

Assim como em qualquer outro armazenamento não inicializado, os objetos são criados usando [placement new](<#/doc/language/new>) e destruídos com chamadas explícitas ao destrutor.

### Possível implementação

Exceto pelo argumento padrão, `aligned_storage` é expressível em termos de `alignas`:
```cpp
    template<std::size_t Len, std::size_t Align = /* default alignment not implemented */>
    struct aligned_storage
    {
        struct type
        {
            alignas(Align) unsigned char data[Len];
        };
    };
```

---

### Exemplo

Uma classe de vetor estático primitiva, demonstrando a criação, acesso e destruição de objetos em armazenamento alinhado.

Execute este código
```cpp
    #include <cstddef>
    #include <iostream>
    #include <new>
    #include <string>
    #include <type_traits>
    
    template<class T, std::size_t N>
    class static_vector
    {
        // Properly aligned uninitialized storage for N T's
        std::aligned_storage_t<sizeof(T), alignof(T)> data[N];
        std::size_t m_size = 0;
    
    public:
        // Create an object in aligned storage
        template<typename ...Args> void emplace_back(Args&&... args)
        {
            if (m_size >= N) // Possible error handling
                throw std::bad_alloc{};
    
            // Construct value in memory of aligned storage using inplace operator new
            ::new(&data[m_size]) T(std::forward<Args>(args)...);
            ++m_size;
        }
    
        // Access an object in aligned storage
        const T& operator pos) const
        {
            // Note: std::launder is needed after the change of object model in P0137R1
            return *std::launder(reinterpret_cast<const T*>(&data[pos]));
        }
    
        // Destroy objects from aligned storage
        ~static_vector()
        {
            for (std::size_t pos = 0; pos < m_size; ++pos)
                // Note: std::launder is needed after the change of object model in P0137R1
                std::destroy_at(std::launder(reinterpret_cast<T*>(&data[pos])));
        }
    };
    
    int main()
    {
        static_vector<std::string, 10> v1;
        v1.emplace_back(5, '*');
        v1.emplace_back(10, '*');
        std::cout << v1[0] << '\n' << v1[1] << '\n';
    }
```

Saída:
```
    *****
    **********
```

### Veja também

`[alignas](<#/doc/language/alignas>)` (C++11) | especifica que o armazenamento para a variável deve ser alinhado por uma quantidade específica
(especificador)
[ alignment_of](<#/doc/types/alignment_of>)(C++11) | obtém os requisitos de alinhamento do tipo
(modelo de classe)
[ aligned_alloc](<#/doc/memory/c/aligned_alloc>)(C++17) | aloca memória alinhada
(função)
[ aligned_union](<#/doc/types/aligned_union>)(desde C++11)(obsoleto em C++23) | define o tipo adequado para uso como armazenamento não inicializado para todos os tipos fornecidos
(modelo de classe)
[ max_align_t](<#/doc/types/max_align_t>)(C++11) | tipo trivial com requisito de alinhamento tão grande quanto qualquer outro tipo escalar
(definição de tipo)
[ launder](<#/doc/utility/launder>)(C++17) | barreira de otimização de ponteiro
(modelo de função)