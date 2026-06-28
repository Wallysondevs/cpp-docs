# std::map&lt;Key,T,Compare,Allocator&gt;::merge

```cpp
template< class C2 >
void merge( std::map<Key, T, C2, Allocator>& source );  // (1) (desde C++17)
template< class C2 >
void merge( std::map<Key, T, C2, Allocator>&& source );  // (2) (desde C++17)
template< class C2 >
void merge( std::multimap<Key, T, C2, Allocator>& source );  // (3) (desde C++17)
template< class C2 >
void merge( std::multimap<Key, T, C2, Allocator>&& source );  // (4) (desde C++17)
```

  
Tenta extrair ("emendar") cada elemento em `source` e inseri-lo em `*this` usando o objeto de comparação de `*this`. Se houver um elemento em `*this` com chave equivalente à chave de um elemento de `source`, então esse elemento não é extraído de `source`. Nenhum elemento é copiado ou movido, apenas os ponteiros internos dos nós do container são redirecionados. Todos os ponteiros e referências para os elementos transferidos permanecem válidos, mas agora se referem a `*this`, e não a `source`.

O comportamento é indefinido se `get_allocator() != source.get_allocator()`.

### Parâmetros

source  |  \-  |  container compatível para transferir os nós de   
  
### Valor de retorno

(nenhum) 

### Exceções

Não lança exceções a menos que a comparação lance. 

### Complexidade

`N * log(size() + N))`, onde `N` é `source.size()`. 

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <map>
    #include <string>
    
    int main()
    {
        std::map<int, std::string> ma{{1, "apple"}, {5, "pear"}, {10, "banana"}};
        std::map<int, std::string> mb{{2, "zorro"}, {4, "batman"}, {5, "X"}, {8, "alpaca"}};
        std::map<int, std::string> u;
        u.merge(ma);
        std::cout << "ma.size(): " << ma.size() << '\n';
        u.merge(mb);
        std::cout << "mb.size(): " << mb.size() << '\n';
        std::cout << "mb.at(5): " << mb.at(5) << '\n';
        for (auto const& kv : u)
            std::cout << kv.first << ", " << kv.second << '\n';
    }
```

Saída: 
```
    ma.size(): 0
    mb.size(): 1
    mb.at(5): X
    1, apple
    2, zorro
    4, batman
    5, pear
    8, alpaca
    10, banana
```

### Veja também

[ extract](<#/doc/container/map/extract>)(C++17) |  extrai nós do container   
(função membro pública)  
[ insert](<#/doc/container/map/insert>) |  insere elementos ou nós (desde C++17)   
(função membro pública)