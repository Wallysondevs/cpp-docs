# std::set&lt;Key,Compare,Allocator&gt;::emplace_hint

```cpp
template< class... Args >
iterator emplace_hint( const_iterator hint, Args&&... args );  // (desde C++11)
```

  
Insere um novo elemento no container o mais próximo possível da posição imediatamente anterior a `hint`.

Os construtores da chave e do valor mapeado são chamados com exatamente os mesmos argumentos fornecidos à função, encaminhados com [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)....

Nenhum iterator ou referência é invalidado.

### Parâmetros

hint  |  \-  |  iterator para a posição antes da qual o novo elemento será inserido   
---|---|---
args  |  \-  |  argumentos a serem encaminhados para o construtor do elemento   
  
### Valor de retorno

Um iterator para o elemento inserido, ou para o elemento que impediu a inserção.

### Exceções

Se uma exceção for lançada por qualquer motivo, esta função não tem efeito ([garantia de segurança forte contra exceções](<#/doc/language/exceptions>)).

### Complexidade

Logarítmica no tamanho do container em geral, mas constante amortizada se o novo elemento for inserido imediatamente antes de `hint`.

### Exemplo

Execute este código
```
    #include <chrono>
    #include <cstddef>
    #include <functional>
    #include <iomanip>
    #include <iostream>
    #include <set>
     
    const int n_operations = 100'500'0;
     
    std::size_t set_emplace()
    {
        std::set<int> set;
        for (int i = 0; i < n_operations; ++i)
            set.emplace(i);
        return set.size();
    }
     
    std::size_t set_emplace_hint()
    {
        std::set<int> set;
        auto it = set.begin();
        for (int i = 0; i < n_operations; ++i)
        {
            set.emplace_hint(it, i);
            it = set.end();
        }
        return set.size();
    }
     
    std::size_t set_emplace_hint_wrong()
    {
        std::set<int> set;
        auto it = set.begin();
        for (int i = n_operations; i > 0; --i)
        {
            set.emplace_hint(it, i);
            it = set.end();
        }
        return set.size();
    }
     
    std::size_t set_emplace_hint_corrected()
    {
        std::set<int> set;
        auto it = set.begin();
        for (int i = n_operations; i > 0; --i)
        {
            set.emplace_hint(it, i);
            it = set.begin();
        }
        return set.size();
    }
     
    std::size_t set_emplace_hint_closest()
    {
        std::set<int> set;
        auto it = set.begin();
        for (int i = 0; i < n_operations; ++i)
            it = set.emplace_hint(it, i);
        return set.size();
    }
     
    double time_it(std::function<std::size_t()> set_test,
                   const char* what = nullptr,
                   double ratio = 0.0)
    {
        const auto start = std::chrono::system_clock::now();
        const std::size_t setsize = set_test();
        const auto stop = std::chrono::system_clock::now();
        const std::chrono::duration<double, std::milli> time = stop - start;
        if (what != nullptr && setsize > 0)
            std::cout << std::setw(8) << time << " for " << what << " (ratio: "
                      << (ratio == 0.0 ? 1.0 : ratio / time.count()) << ")\n";
        return time.count();
    }
     
    int main()
    {
        std::cout << std::fixed << std::setprecision(2);
        time_it(set_emplace); // cache warmup
        const auto x = time_it(set_emplace, "plain emplace");
        time_it(set_emplace_hint, "emplace with correct hint", x);
        time_it(set_emplace_hint_wrong, "emplace with wrong hint", x);
        time_it(set_emplace_hint_corrected, "corrected emplace", x);
        time_it(set_emplace_hint_closest, "emplace using returned iterator", x);
    }
```

Saída possível: 
```
    392.25ms for plain emplace (ratio: 1.00)
     97.15ms for emplace with correct hint (ratio: 4.04)
    387.52ms for emplace with wrong hint (ratio: 1.01)
     84.80ms for corrected emplace (ratio: 4.63)
     83.67ms for emplace using returned iterator (ratio: 4.69)
```

### Veja também

[ emplace](<#/doc/container/set/emplace>)(C++11) | constrói o elemento no local   
(função membro pública)  
[ insert](<#/doc/container/set/insert>) | insere elementos ou nós (desde C++17)   
(função membro pública)