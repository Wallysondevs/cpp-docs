# std::deque&lt;T,Allocator&gt;::shrink_to_fit

void shrink_to_fit();

  
Solicita a remoção da capacidade não utilizada.

É uma solicitação não vinculativa para reduzir o uso de memória sem alterar o tamanho da sequência. Depende da implementação se a solicitação será atendida.

Todos os iteradores (incluindo o iterador [`end()`](<#/doc/container/deque/end>)) e todas as referências aos elementos são invalidados.

Se `T` não for [MoveInsertable](<#/doc/named_req/MoveInsertable>) em [std::deque](<#/doc/container/deque>)<T, Allocator>, o comportamento é indefinido. | (desde C++11)  
  
### Complexidade

No máximo linear no tamanho do contêiner.

### Exceções

Se uma exceção for lançada que não seja pelo construtor de movimento de um `T` não-[CopyInsertable](<#/doc/named_req/CopyInsertable>), não há efeitos. | (desde C++11)  
  
### Notas

No libstdc++, `shrink_to_fit()` [não está disponível](<https://gcc.gnu.org/onlinedocs/libstdc++/manual/strings.html#strings.string.shrink>) no modo C++98.

### Exemplo

Execute este código
```
    #include <cstddef>
    #include <deque>
    #include <iostream>
    #include <new>
     
    // Minimal C++11 allocator with debug output.
    template<class Tp>
    struct NAlloc
    {
        typedef Tp value_type;
     
        NAlloc() = default;
     
        template<class T> NAlloc(const NAlloc<T>&) {}
     
        Tp* allocate(std::size_t n)
        {
            n *= sizeof(Tp);
            std::cout << "allocating " << n << " bytes\n";
            return static_cast<Tp*>(::operator new(n));
        }
     
        void deallocate(Tp* p, std::size_t n)
        {
            std::cout << "deallocating " << n*sizeof*p << " bytes\n";
            ::operator delete(p);
        }
    };
    template<class T, class U>
    bool operator==(const NAlloc<T>&, const NAlloc<U>&) { return true; }
    template<class T, class U>
    bool operator!=(const NAlloc<T>&, const NAlloc<U>&) { return false; }
     
    int main()
    {
        // std::queue has no capacity() function (like std::vector).
        // Because of this, we use a custom allocator to show the
        // working of shrink_to_fit.
     
        std::cout << "Default-construct deque:\n";
        std::deque<int, NAlloc<int>> deq;
     
        std::cout << "\nAdd 300 elements:\n";
        for (int i = 1000; i < 1300; ++i)
            deq.push_back(i);
     
        std::cout << "\nPop 100 elements:\n";
        for (int i = 0; i < 100; ++i)
            deq.pop_front();
     
        std::cout << "\nRun shrink_to_fit:\n";
        deq.shrink_to_fit();
     
        std::cout << "\nDestroy deque as it goes out of scope:\n";
    }
```

Saída possível: 
```
    Default-construct deque:
    allocating 64 bytes
    allocating 512 bytes
     
    Add 300 elements:
    allocating 512 bytes
    allocating 512 bytes
     
    Pop 100 elements:
     
    Run shrink_to_fit:
    allocating 64 bytes
    allocating 512 bytes
    allocating 512 bytes
    deallocating 512 bytes
    deallocating 512 bytes
    deallocating 512 bytes
    deallocating 64 bytes
     
    Destroy deque as it goes out of scope:
    deallocating 512 bytes
    deallocating 512 bytes
    deallocating 64 bytes
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento publicado  | Comportamento correto   
---|---
[LWG 850](<https://cplusplus.github.io/LWG/issue850>) | C++98  | `std::deque` não possuía operações explícitas de shrink-to-fit  | fornecido   
[LWG 2033](<https://cplusplus.github.io/LWG/issue2033>) | C++98  
C++11  | 1. o requisito de complexidade estava ausente (C++98)  
2. `T` não era exigido ser [MoveInsertable](<#/doc/named_req/MoveInsertable>) (C++11)  | 1. adicionado  
2. exigido   
[LWG 2223](<https://cplusplus.github.io/LWG/issue2223>) | C++98  
---|---
C++11  | 1. referências, ponteiros e iteradores não eram invalidados (C++98)  
2. não havia garantia de segurança de exceção (C++11)  | 1. eles podem ser invalidados  
2. adicionado   
  
### Veja também

[ size](<#/doc/container/deque/size>) | retorna o número de elementos   
(função membro pública)  