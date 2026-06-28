# std::align

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
void* align( std::size_t alignment,
std::size_t size,
void*& ptr,
std::size_t& space );
```

  
Dado um ponteiro ptr para um buffer de tamanho space, retorna um ponteiro alinhado pelo alinhamento especificado para size número de bytes e diminui o argumento space pelo número de bytes usados para alinhamento. O primeiro endereço alinhado é retornado.

A função modifica o ponteiro apenas se for possível encaixar o número desejado de bytes alinhados pelo alinhamento fornecido no buffer. Se o buffer for muito pequeno, a função não faz nada e retorna nullptr.

O comportamento é indefinido se alignment não for uma potência de dois.

### Parâmetros

alignment  |  \-  |  o alinhamento desejado   
---|---|---
size  |  \-  |  o tamanho do armazenamento a ser alinhado   
ptr  |  \-  |  ponteiro para armazenamento contíguo (um buffer) de pelo menos `space` bytes   
space  |  \-  |  o tamanho do buffer no qual operar   
  
### Valor de retorno

O valor ajustado de ptr, ou valor de ponteiro nulo se o espaço fornecido for muito pequeno.

### Exemplo

Demonstra o uso de `std::align` para posicionar objetos de diferentes tipos na memória.

Execute este código
```cpp
    #include <iostream>
    #include <memory>
     
    template<std::size_t N>
    struct MyAllocator
    {
        char data[N];
        void* p;
        std::size_t sz;
        MyAllocator() : p(data), sz(N) {}
        template<typename T>
        T* aligned_alloc(std::size_t a = alignof(T))
        {
            if (std::align(a, sizeof(T), p, sz))
            {
                T* result = reinterpret_cast<T*>(p);
                p = (char*)p + sizeof(T);
                sz -= sizeof(T);
                return result;
            }
            return nullptr;
        }
    };
     
    int main()
    {
        MyAllocator<64> a;
        std::cout << "allocated a.data at " << (void*)a.data
                  << " (" << sizeof a.data << " bytes)\n";
     
        // allocate a char
        if (char* p = a.aligned_alloc<char>())
        {
            *p = 'a';
            std::cout << "allocated a char at " << (void*)p << '\n';
        }
     
        // allocate an int
        if (int* p = a.aligned_alloc<int>())
        {
            *p = 1;
            std::cout << "allocated an int at " << (void*)p << '\n';
        }
     
        // allocate an int, aligned at 32-byte boundary
        if (int* p = a.aligned_alloc<int>(32))
        {
            *p = 2;
            std::cout << "allocated an int at " << (void*)p << " (32 byte alignment)\n";
        }
    }
```

Saída possível:
```
    allocated a.data at 0x7ffd0b331f80 (64 bytes)
    allocated a char at 0x7ffd0b331f80
    allocated an int at 0x7ffd0b331f84
    allocated an int at 0x7ffd0b331fa0 (32 byte alignment)
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento publicado  | Comportamento correto   
---|---|---|---
[LWG 2377](<https://cplusplus.github.io/LWG/issue2377>) | C++11  | `alignment` exigia ser um valor de alinhamento fundamental ou estendido suportado  | só precisa ser uma potência de dois   
  
### Veja também

`[alignof](<#/doc/language/alignof>)` (C++11) | consulta os requisitos de alinhamento de um tipo  
(operador)  
`[alignas](<#/doc/language/alignas>)` (C++11) | especifica que o armazenamento para a variável deve ser alinhado por uma quantidade específica  
(especificador)  
[ aligned_storage](<#/doc/types/aligned_storage>)(desde C++11)(obsoleto em C++23) | define o tipo adequado para uso como armazenamento não inicializado para tipos de determinado tamanho   
(modelo de classe)  
[ assume_aligned](<#/doc/memory/assume_aligned>)(C++20) | informa ao compilador que um ponteiro está alinhado   
(modelo de função)