# std::multiset&lt;Key,Compare,Allocator&gt;::emplace

```cpp
template< class... Args >
iterator emplace( Args&&... args );  // (desde C++11)
```

  
Insere um novo elemento no container, construído no local com os `args` fornecidos.

O construtor do novo elemento é chamado com exatamente os mesmos argumentos fornecidos a `emplace`, encaminhados via [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)....

O uso cuidadoso de `emplace` permite que o novo elemento seja construído, evitando operações de cópia ou movimentação desnecessárias.

Nenhum iterator ou referência é invalidado.

### Parâmetros

args  |  \-  |  argumentos a serem encaminhados para o construtor do elemento   
  
### Valor de retorno

Um iterator para o elemento inserido.

### Exceções

Se uma exceção for lançada por qualquer motivo, esta função não tem efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)).

### Complexidade

Logarítmica no tamanho do container.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <cstddef>
    #include <functional>
    #include <iomanip>
    #include <iostream>
    #include <string>
    #include <set>
    
    class Dew
    {
    private:
        int a, b, c;
    
    public:
        Dew(int _a, int _b, int _c)
            : a(_a), b(_b), c(_c)
        {}
    
        bool operator<(const Dew& other) const
        {
            return (a < other.a) ||
                   (a == other.a && b < other.b) ||
                   (a == other.a && b == other.b && c < other.c);
        }
    };
    
    constexpr int nof_operations{101};
    
    std::size_t set_emplace()
    {
        std::multiset<Dew> set;
        for (int i = 0; i < nof_operations; ++i)
            for (int j = 0; j < nof_operations; ++j)
                for (int k = 0; k < nof_operations; ++k)
                    set.emplace(i, j, k);
    
        return set.size();
    }
    
    std::size_t set_insert()
    {
        std::multiset<Dew> set;
        for (int i = 0; i < nof_operations; ++i)
            for (int j = 0; j < nof_operations; ++j)
                for (int k = 0; k < nof_operations; ++k)
                    set.insert(Dew(i, j, k));
    
        return set.size();
    }
    
    void time_it(std::function<int()> set_test, std::string what = "")
    {
        const auto start = std::chrono::system_clock::now();
        const auto the_size = set_test();
        const auto stop = std::chrono::system_clock::now();
        const std::chrono::duration<double, std::milli> time = stop - start;
        if (!what.empty() && the_size)
            std::cout << std::fixed << std::setprecision(2)
                      << time << " for " << what << '\n';
    }
    
    int main()
    {
        time_it(set_insert, "cache warming...");
        time_it(set_insert, "insert");
        time_it(set_insert, "insert");
        time_it(set_emplace, "emplace");
        time_it(set_emplace, "emplace");
    }
```

Saída possível: 
```
    499.61ms for cache warming...
    447.89ms for insert
    436.77ms for insert
    430.62ms for emplace
    428.61ms for emplace
```

### Veja também

[ emplace_hint](<#/doc/container/multiset/emplace_hint>)(C++11) | constrói elementos no local usando uma dica   
(função membro pública)  
[ insert](<#/doc/container/multiset/insert>) | insere elementos ou nós (desde C++17)   
(função membro pública)