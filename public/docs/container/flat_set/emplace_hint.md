# std::flat_set&lt;Key,Compare,KeyContainer&gt;::emplace_hint

```cpp
template< class... Args >
iterator emplace_hint( const_iterator hint, Args&&... args );  // (desde C++23)
```

  
Insere um novo elemento no container o mais próximo possível da posição imediatamente anterior a hint. 

Os construtores da chave e do valor mapeado são chamados com exatamente os mesmos argumentos fornecidos à função, encaminhados com [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args).... 

| As informações sobre invalidação de iteradores são copiadas de [aqui](<https://en.cppreference.com/w/Template:cpp/container/note_iterator_invalidation> "Template:cpp/container/note iterator invalidation")  
  
### Parâmetros

hint  |  \-  |  iterador para a posição antes da qual o novo elemento será inserido   
---|---|---
args  |  \-  |  argumentos a serem encaminhados para o construtor do elemento   
  
### Valor de retorno

Um iterador para o elemento inserido, ou para o elemento que impediu a inserção. 

### Exceções

Se uma exceção for lançada por qualquer motivo, esta função não tem efeito ([garantia de segurança forte contra exceções](<#/doc/language/exceptions>)). 

### Complexidade

| Esta seção está incompleta   
  
### Exemplo

Execute este código
```
    #include <chrono>
    #include <cstddef>
    #include <functional>
    #include <iomanip>
    #include <iostream>
    #include <flat_set>
     
    const int n_operations = 100'500'0;
     
    std::size_t set_emplace()
    {
        std::flat_set<int> set;
        for (int i = 0; i < n_operations; ++i)
            set.emplace(i);
        return set.size();
    }
     
    std::size_t set_emplace_hint()
    {
        std::flat_set<int> set;
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
        std::flat_set<int> set;
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
        std::flat_set<int> set;
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
        std::flat_set<int> set;
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
    ...TODO...
```

### Veja também

[ emplace](<#/doc/container/flat_set/emplace>) | constrói o elemento no local   
(função membro pública)  
[ insert](<#/doc/container/flat_set/insert>) | insere elementos   
(função membro pública)