# std::vector&lt;T,Allocator&gt;::reserve

void reserve( size_type new_cap ); |  |  (constexpr desde C++20)  

  
Aumenta a capacidade do vector (o número total de elementos que o vector pode conter sem exigir realocação) para um valor maior ou igual a `new_cap`. Se `new_cap` for maior que a [capacity()](<#/doc/container/vector/capacity>) atual, um novo armazenamento é alocado; caso contrário, a função não faz nada. 

`reserve()` não altera o size do vector. 

Se `new_cap` for maior que [capacity()](<#/doc/container/vector/capacity>), todos os iterators (incluindo o iterator [`end()`](<#/doc/container/vector/end>)) e todas as referências aos elementos são invalidados. Caso contrário, nenhum iterator ou referência é invalidado. 

Após uma chamada a `reserve()`, as inserções não acionarão realocação a menos que a inserção torne o size do vector maior que o valor de [capacity()](<#/doc/container/vector/capacity>). 

### Parameters

new_cap  |  \-  |  nova capacidade do vector, em número de elementos   
Requisitos de tipo   
-`T` deve atender aos requisitos de [MoveInsertable](<#/doc/named_req/MoveInsertable>) em *this. (desde C++11)  
  
### Return value

(nenhum) 

### Exceptions

  * [std::length_error](<#/doc/error/length_error>) se new_cap > max_size(). 
  * Qualquer exceção lançada por `Allocator::allocate()` (tipicamente [std::bad_alloc](<#/doc/memory/new/bad_alloc>)). 

Se uma exceção for lançada, esta função não tem efeito ([garantia de exceção forte](<#/doc/language/exceptions>)). 

```cpp
Se o move constructor de `T` não for `noexcept` e `T` não for CopyInsertable em *this, o vector usará o move constructor que lança exceções. Se ele lançar, a garantia é anulada e os efeitos são não especificados.  // (desde C++11)
```
  
### Complexity

No máximo linear no [size()](<#/doc/container/vector/size>) do container. 

### Notes

Usar `reserve()` corretamente pode evitar realocações desnecessárias, mas usos inadequados de `reserve()` (por exemplo, chamá-lo antes de cada chamada a [push_back()](<#/doc/container/vector/push_back>)) podem, na verdade, aumentar o número de realocações (fazendo com que a capacidade cresça linearmente em vez de exponencialmente) e resultar em maior complexidade computacional e desempenho reduzido. Por exemplo, uma função que recebe um vector arbitrário por referência e adiciona elementos a ele geralmente _não_ deve chamar `reserve()` no vector, pois não conhece as características de uso do vector. 

Ao inserir um range, a versão de range de [insert()](<#/doc/container/vector/insert>) é geralmente preferível, pois preserva o comportamento correto de crescimento da capacidade, ao contrário de `reserve()` seguido por uma série de [push_back()](<#/doc/container/vector/push_back>)s. 

`reserve()` não pode ser usado para reduzir a capacidade do container; para esse fim, [shrink_to_fit()](<#/doc/container/vector/shrink_to_fit>) é fornecido. 

### Example

Execute este código
```
    #include <cstddef>
    #include <iostream>
    #include <new>
    #include <vector>
     
    // minimal C++11 allocator with debug output
    template<class Tp>
    struct NAlloc
    {
        typedef Tp value_type;
     
        NAlloc() = default;
        template<class T>
        NAlloc(const NAlloc<T>&) {}
     
        Tp* allocate(std::size_t n)
        {
            n *= sizeof(Tp);
            Tp* p = static_cast<Tp*>(::operator new(n));
            std::cout << "allocating " << n << " bytes @ " << p << '\n';
            return p;
        }
     
        void deallocate(Tp* p, std::size_t n)
        {
            std::cout << "deallocating " << n * sizeof *p << " bytes @ " << p << "\n\n";
            ::operator delete(p);
        }
    };
     
    template<class T, class U>
    bool operator==(const NAlloc<T>&, const NAlloc<U>&) { return true; }
     
    template<class T, class U>
    bool operator!=(const NAlloc<T>&, const NAlloc<U>&) { return false; }
     
    int main()
    {
        constexpr int max_elements = 32;
     
        std::cout << "using reserve: \n";
        {
            std::vector<int, NAlloc<int>> v1;
            v1.reserve(max_elements); // reserves at least max_elements * sizeof(int) bytes
     
            for (int n = 0; n < max_elements; ++n)
                v1.push_back(n);
        }
     
        std::cout << "not using reserve: \n";
        {
            std::vector<int, NAlloc<int>> v1;
     
            for (int n = 0; n < max_elements; ++n)
            {
                if (v1.size() == v1.capacity())
                    std::cout << "size() == capacity() == " << v1.size() << '\n';
                v1.push_back(n);
            }
        }
    }
```

Saída possível: 
```
    using reserve: 
    allocating 128 bytes @ 0xa6f840
    deallocating 128 bytes @ 0xa6f840
     
    not using reserve: 
    size() == capacity() == 0
    allocating 4 bytes @ 0xa6f840
     
    size() == capacity() == 1
    allocating 8 bytes @ 0xa6f860
    deallocating 4 bytes @ 0xa6f840
     
    size() == capacity() == 2
    allocating 16 bytes @ 0xa6f840
    deallocating 8 bytes @ 0xa6f860
     
    size() == capacity() == 4
    allocating 32 bytes @ 0xa6f880
    deallocating 16 bytes @ 0xa6f840
     
    size() == capacity() == 8
    allocating 64 bytes @ 0xa6f8b0
    deallocating 32 bytes @ 0xa6f880
     
    size() == capacity() == 16
    allocating 128 bytes @ 0xa6f900
    deallocating 64 bytes @ 0xa6f8b0
     
    deallocating 128 bytes @ 0xa6f900
```

### Defect reports

Os seguintes defect reports que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 329](<https://cplusplus.github.io/LWG/issue329>) | C++98  | realocação pode ser acionada se uma inserção  
tornar o size do vector maior que o size  
especificado na chamada mais recente a `reserve()` | só aciona se o size  
do vector se tornar  
maior que [capacity()](<#/doc/container/vector/capacity>)  
[LWG 2033](<https://cplusplus.github.io/LWG/issue2033>) | C++11  | `T` não era exigido ser [MoveInsertable](<#/doc/named_req/MoveInsertable>) | exigido   
  
### See also

[ capacity](<#/doc/container/vector/capacity>) |  retorna o número de elementos que podem ser mantidos no armazenamento atualmente alocado   
(função membro pública)  
[ max_size](<#/doc/container/vector/max_size>) |  retorna o número máximo possível de elementos   
(função membro pública)  
[ resize](<#/doc/container/vector/resize>) |  altera o número de elementos armazenados   
(função membro pública)  
[ shrink_to_fit](<#/doc/container/vector/shrink_to_fit>)(DR*) |  reduz o uso de memória liberando memória não utilizada   
(função membro pública)