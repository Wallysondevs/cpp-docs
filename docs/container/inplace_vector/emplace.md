# std::inplace_vector&lt;T,N&gt;::emplace

```cpp
template< class... Args >
constexpr iterator emplace( const_iterator position, Args&&... args );  // (desde C++26)
```

  
Insere um novo elemento no container diretamente antes de pos. Tipicamente, o elemento é construído usando placement-new para construir o elemento no local fornecido pelo container. Os argumentos args... são encaminhados para o construtor como [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)....

### Parâmetros

pos  |  \-  |  iterator antes do qual o novo elemento será construído   
---|---|---
args  |  \-  |  argumentos a serem encaminhados para o construtor do elemento   
Requisitos de tipo   
-`T` deve satisfazer os requisitos de [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>).   
  
### Valor de retorno

Um iterator para o elemento inserido.

### Complexidade

Linear: a distância entre pos e o fim do container + 1.

### Exceções

  * Lança [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se antes da invocação size() == capacity(). A função não tem efeitos ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)). 
  * Qualquer exceção lançada pela inicialização do elemento inserido ou por qualquer operação de [LegacyInputIterator](<#/doc/named_req/InputIterator>). Elementos em `[`​0​`, `pos`)` não são modificados. 

### Exemplo

Execute este código
```
    #include <cassert>
    #include <inplace_vector>
    #include <new>
    #include <utility>
     
    int main()
    {
        using P = std::pair<int, int>;
        using I = std::inplace_vector<P, 3>;
        auto nums = I{{0, 1}, {2, 3}};
     
        auto it = nums.emplace(nums.begin() + 1, -1, -2);
        assert((*it == P{-1, -2}));
        assert((nums == I{P{0, 1}, {-1, -2}, {2, 3}}));
     
        try
        {
            nums.emplace(nums.begin(), 1, 3); // throws: no space
        }
        catch(const std::bad_alloc& ex)
        {
            std::cout << ex.what() << '\n';
        }
    }
```

Saída possível: 
```
    std::bad_alloc
```

### Veja também

[ insert](<#/doc/container/inplace_vector/insert>) |  insere elementos   
(função membro pública)  
[ emplace_back](<#/doc/container/inplace_vector/emplace_back>) |  constrói um elemento no local no final   
(função membro pública)