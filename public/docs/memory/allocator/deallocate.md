# std::allocator&lt;T&gt;::deallocate

void deallocate( T* p, [std::size_t](<#/doc/types/size_t>) n ); |  |  (constexpr desde C++20)  

  
Desaloca o armazenamento referenciado pelo ponteiro p, que deve ser um ponteiro obtido por uma chamada anterior a [allocate()](<#/doc/memory/allocator/allocate>) ou [`allocate_at_least()`](<#/doc/memory/allocator/allocate_at_least>)(desde C++23). 

O argumento n deve ser igual ao primeiro argumento da chamada a [allocate()](<#/doc/memory/allocator/allocate>) que originalmente produziu p, ou no range `[`m`, `count`]` se p for obtido de uma chamada a allocate_at_least(m) que retornou {p, count}(desde C++23); caso contrário, o comportamento é indefinido. 

Chama ::[operator delete](<#/doc/memory/new/operator_delete>)(void*) ou ::[operator delete](<#/doc/memory/new/operator_delete>)(void*, [std::align_val_t](<#/doc/memory/new/align_val_t>))(desde C++17), mas é não especificado quando e como é chamado. 

Na avaliação de uma expressão constante, esta função deve desalocar o armazenamento alocado dentro da avaliação da mesma expressão.  | (desde C++20)  
  
### Parâmetros

p  |  \-  |  ponteiro obtido de [allocate()](<#/doc/memory/allocator/allocate>) ou [`allocate_at_least()`](<#/doc/memory/allocator/allocate_at_least>)(desde C++23)  
---|---|---
n  |  \-  |  número de objetos passados anteriormente para [allocate()](<#/doc/memory/allocator/allocate>), ou um número entre o número de objetos solicitado e o realmente alocado via [`allocate_at_least()`](<#/doc/memory/allocator/allocate_at_least>) (pode ser igual a qualquer um dos limites)(desde C++23)  
  
### Valor de retorno

(nenhum) 

### Exemplo

Run this code
```
    #include <algorithm>
    #include <cstddef>
    #include <iostream>
    #include <memory>
    #include <string>
     
    class S
    {
        inline static int n{1};
        int m{};
        void pre() const { std::cout << "#" << m << std::string(m, ' '); }
    public:
        S(int x) : m{n++} { pre(); std::cout << "S::S(" << x << ");\n"; }
        ~S() { pre(); std::cout << "S::~S();\n"; }
        void id() const { pre(); std::cout << "S::id();\n"; }
    };
     
    int main()
    {
        constexpr std::size_t n{4};
        std::allocator<S> allocator;
        try
        {
            S* s = allocator.allocate(n); // may throw
            for (std::size_t i{}; i != n; ++i)
            {
            //  allocator.construct(&s[i], i + 42); // removed in C++20
                std::construct_at(&s[i], i + 42);   // since C++20
            }
            std::for_each_n(s, n,  { e.id(); });
            std::destroy_n(s, n);
            allocator.deallocate(s, n);
        }
        catch (std::bad_array_new_length const& ex) { std::cout << ex.what() << '\n'; }
        catch (std::bad_alloc const& ex) { std::cout << ex.what() << '\n'; }
    }
```

Output: 
```
    #1 S::S(42);
    #2  S::S(43);
    #3   S::S(44);
    #4    S::S(45);
    #1 S::id();
    #2  S::id();
    #3   S::id();
    #4    S::id();
    #1 S::~S();
    #2  S::~S();
    #3   S::~S();
    #4    S::~S();
```

### Ver também

[ allocate](<#/doc/memory/allocator/allocate>) |  aloca armazenamento não inicializado   
(função membro pública)  
[ allocate_at_least](<#/doc/memory/allocator/allocate_at_least>)(C++23) |  aloca armazenamento não inicializado pelo menos tão grande quanto o tamanho solicitado   
(função membro pública)  
[ deallocate](<#/doc/memory/allocator_traits/deallocate>)[static] |  desaloca armazenamento usando o allocator   
(função membro estática pública de `std::allocator_traits<Alloc>`)