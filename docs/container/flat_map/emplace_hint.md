# std::flat_map&lt;Key,T,Compare,KeyContainer,MappedContainer&gt;::emplace_hint

```cpp
template< class... Args >
iterator emplace_hint( const_iterator hint, Args&&... args );  // (desde C++23)
```

  
Insere um novo elemento no container o mais próximo possível da posição imediatamente anterior a `hint`.

O construtor do tipo do elemento (`value_type`, ou seja, [std::pair](<#/doc/utility/pair>)&lt;const Key, T&gt;) é chamado com exatamente os mesmos argumentos fornecidos à função, encaminhados com [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)....

| Informações sobre invalidação de iteradores são copiadas de [aqui](<https://en.cppreference.com/w/Template:cpp/container/note_iterator_invalidation> "Template:cpp/container/note iterator invalidation")  
  
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
```cpp
    #include <chrono>
    #include <cstddef>
    #include <functional>
    #include <iomanip>
    #include <iostream>
    #include <flat_map>
     
    const int n_operations = 100'500'0;
     
    std::size_t map_emplace()
    {
        std::flat_map<int, char> map;
        for (int i = 0; i < n_operations; ++i)
            map.emplace(i, 'a');
        return map.size();
    }
     
    std::size_t map_emplace_hint()
    {
        std::flat_map<int, char> map;
        auto it = map.begin();
        for (int i = 0; i < n_operations; ++i)
        {
            map.emplace_hint(it, i, 'b');
            it = map.end();
        }
        return map.size();
    }
     
    std::size_t map_emplace_hint_wrong()
    {
        std::flat_map<int, char> map;
        auto it = map.begin();
        for (int i = n_operations; i > 0; --i)
        {
            map.emplace_hint(it, i, 'c');
            it = map.end();
        }
        return map.size();
    }
     
    std::size_t map_emplace_hint_corrected()
    {
        std::flat_map<int, char> map;
        auto it = map.begin();
        for (int i = n_operations; i > 0; --i)
        {
            map.emplace_hint(it, i, 'd');
            it = map.begin();
        }
        return map.size();
    }
     
    std::size_t map_emplace_hint_closest()
    {
        std::flat_map<int, char> map;
        auto it = map.begin();
        for (int i = 0; i < n_operations; ++i)
            it = map.emplace_hint(it, i, 'e');
        return map.size();
    }
     
    double time_it(std::function<std::size_t()> map_test,
                   std::string what = "", double ratio = 0.0)
    {
        const auto start = std::chrono::system_clock::now();
        const std::size_t map_size = map_test();
        const auto stop = std::chrono::system_clock::now();
        std::chrono::duration<double, std::milli> time = stop - start;
        if (what.size() && map_size)
            std::cout << std::setw(8) << time << " for " << what << " (ratio: "
                      << (ratio == 0.0 ? 1.0 : ratio / time.count()) << ")\n";
        return time.count();
    }
     
    int main()
    {
        std::cout << std::fixed << std::setprecision(2);
        time_it(map_emplace); // cache warmup
        const auto x = time_it(map_emplace, "plain emplace");
        time_it(map_emplace_hint, "emplace with correct hint", x);
        time_it(map_emplace_hint_wrong, "emplace with wrong hint", x);
        time_it(map_emplace_hint_corrected, "corrected emplace", x);
        time_it(map_emplace_hint_closest, "emplace using returned iterator", x);
    }
```

Saída possível: 
```
    ...TODO...
```

### Veja também

[ emplace](<#/doc/container/flat_map/emplace>) | constrói o elemento no local   
(função membro pública)  
[ insert](<#/doc/container/flat_map/insert>) | insere elementos   
(função membro pública)