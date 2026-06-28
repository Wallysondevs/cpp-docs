# std::inplace_vector&lt;T,N&gt;::emplace_back

```cpp
template< class... Args >
constexpr reference emplace_back( Args&&... args );  // (desde C++26)
```

  
Adiciona um novo elemento ao final do container. Tipicamente, o elemento é construído usando placement-new para construir o elemento no local fornecido pelo container. Os argumentos args... são encaminhados para o construtor como [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args).... 

Nenhum iterator ou referência é invalidado, exceto [`end()`](<#/doc/container/inplace_vector/end>), que é invalidado se a inserção ocorrer. 

### Parâmetros

args  |  \-  |  argumentos a serem encaminhados para o construtor do elemento   
Requisitos de tipo   
-`T` deve atender aos requisitos de [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>).   
  
### Valor de retorno

[`back()`](<#/doc/container/inplace_vector/back>), ou seja, uma referência para o elemento inserido. 

### Complexidade

Constante. 

### Exceções

  * [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se size() == capacity() antes da invocação. 
  * Qualquer exceção lançada pela inicialização do elemento inserido. 

Se uma exceção for lançada por qualquer motivo, essas funções não têm efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)). 

### Exemplo

Execute este código
```cpp 
    #include <inplace_vector>
    #include <new>
    #include <print>
    #include <string>
    #include <utility>
    
    int main()
    {
        std::inplace_vector<std::pair<std::string, std::string>, 2> fauna;
        std::string dog{"\N{DOG}"};
    
        fauna.emplace_back("\N{CAT}", dog);
        fauna.emplace_back("\N{CAT}", std::move(dog));
        std::println("fauna = {}", fauna);
    
        try
        {
            fauna.emplace_back("\N{BUG}", "\N{BUG}"); // throws: there is no space
        }
        catch(const std::bad_alloc& ex)
        {
            std::println("{}", ex.what());
        }
        std::println("fauna = {}", fauna);
    }
```

Saída possível: 
```
    fauna = [("🐈", "🐕"), ("🐈", "🐕")]
    std::bad_alloc
    fauna = [("🐈", "🐕"), ("🐈", "🐕")]
```

### Veja também

[ append_range](<#/doc/container/inplace_vector/append_range>) |  adiciona um range de elementos ao final   
(função membro pública)  
[ push_back](<#/doc/container/inplace_vector/push_back>) |  adiciona um elemento ao final   
(função membro pública)  
[ try_push_back](<#/doc/container/inplace_vector/try_push_back>) |  tenta adicionar um elemento ao final   
(função membro pública)  
[ try_emplace_back](<#/doc/container/inplace_vector/try_emplace_back>) |  tenta construir um elemento no local ao final   
(função membro pública)  
[ try_append_range](<#/doc/container/inplace_vector/try_append_range>) |  tenta adicionar um range de elementos ao final   
(função membro pública)  
[ unchecked_push_back](<#/doc/container/inplace_vector/unchecked_push_back>) |  adiciona incondicionalmente um elemento ao final   
(função membro pública)  
[ unchecked_emplace_back](<#/doc/container/inplace_vector/unchecked_emplace_back>) |  constrói incondicionalmente um elemento no local ao final   
(função membro pública)  
[ pop_back](<#/doc/container/inplace_vector/pop_back>) |  remove o último elemento   
(função membro pública)  
[ back_inserter](<#/doc/iterator/back_inserter>) |  cria um [std::back_insert_iterator](<#/doc/iterator/back_insert_iterator>) de tipo inferido a partir do argumento   
(modelo de função)