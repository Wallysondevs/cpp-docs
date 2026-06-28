# std::inplace_vector&lt;T,N&gt;::try_emplace_back

```cpp
template< class... Args >
constexpr pointer try_emplace_back( Args&&... args );  // (desde C++26)
```

  
Adiciona condicionalmente um objeto do tipo `T` ao final do container. 

Se size() == capacity() for verdadeiro, não há efeitos. Caso contrário, adiciona um objeto do tipo `T` inicializado diretamente (direct-non-list-initialized) com [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args).... 

Nenhum iterator ou referência é invalidado, exceto [`end()`](<#/doc/container/inplace_vector/end>), que é invalidado se a inserção ocorrer. 

### Parâmetros

args  |  \-  |  argumentos a serem encaminhados para o construtor do elemento   
Requisitos de tipo   
-`T` deve ser [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `inplace_vector` a partir de [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)....   
  
### Valor de retorno

[std::addressof](<#/doc/memory/addressof>)(back()) se size() < capacity(), nullptr caso contrário. 

### Complexidade

Constante. 

### Exceções

Qualquer exceção lançada pela inicialização do elemento inserido. Se uma exceção for lançada por qualquer motivo, esta função não tem efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)). 

### Notas

| Esta seção está incompleta  
Razão: Explicar o propósito desta API.   
  
### Exemplo

Execute este código
```
    #include <cassert>
    #include <complex>
    #include <inplace_vector>
     
    int main()
    {
        using namespace std::complex_literals;
        using C = std::complex<double>;
        using I = std::inplace_vector<C, 3>;
        auto v = I{1.0 + 2.0i, 3.0 + 4.0i};
     
        C* c = v.try_emplace_back(5.0, 6.0);
        assert(*c == 5.0 + 6.0i);
        assert((v == I{1.0 + 2.0i, 3.0 + 4.0i, 5.0 + 6.0i}));
     
        c = v.try_emplace_back(7.0, 8.0); // no space => no insertion
        assert(c == nullptr);
        assert((v == I{1.0 + 2.0i, 3.0 + 4.0i, 5.0 + 6.0i}));
    }
```

### Veja também

[ emplace_back](<#/doc/container/inplace_vector/emplace_back>) | constrói um elemento no local (in-place) no final   
(função membro pública)  
[ push_back](<#/doc/container/inplace_vector/push_back>) | adiciona um elemento ao final   
(função membro pública)  
[ append_range](<#/doc/container/inplace_vector/append_range>) | adiciona um range de elementos ao final   
(função membro pública)  
[ try_append_range](<#/doc/container/inplace_vector/try_append_range>) | tenta adicionar um range de elementos ao final   
(função membro pública)  
[ unchecked_emplace_back](<#/doc/container/inplace_vector/unchecked_emplace_back>) | constrói incondicionalmente um elemento no local (in-place) no final   
(função membro pública)  
[ unchecked_push_back](<#/doc/container/inplace_vector/unchecked_push_back>) | adiciona incondicionalmente um elemento ao final   
(função membro pública)  
[ pop_back](<#/doc/container/inplace_vector/pop_back>) | remove o último elemento   
(função membro pública)  
[ back_inserter](<#/doc/iterator/back_inserter>) | cria um [std::back_insert_iterator](<#/doc/iterator/back_insert_iterator>) de tipo inferido a partir do argumento   
(modelo de função)