# std::unordered_map&lt;Key,T,Hash,KeyEqual,Allocator&gt;::merge

```cpp
template< class H2, class P2 >
void merge( std::unordered_map<Key, T, H2, P2, Allocator>& source );  // (1) (desde C++17)
template< class H2, class P2 >
void merge( std::unordered_map<Key, T, H2, P2, Allocator>&& source );  // (2) (desde C++17)
template< class H2, class P2 >
void merge( std::unordered_multimap<Key, T, H2, P2, Allocator>& source );  // (3) (desde C++17)
template< class H2, class P2 >
void merge( std::unordered_multimap<Key, T, H2, P2, Allocator>&& source );  // (4) (desde C++17)
```

  
Tenta extrair ("emendar") cada elemento em `source` e inseri-lo em `*this` usando a função hash e o predicado de igualdade de chave de `*this`. Se houver um elemento em `*this` com chave equivalente à chave de um elemento de `source`, então esse elemento não é extraído de `source`. Nenhum elemento é copiado ou movido, apenas os ponteiros internos dos nós do container são redirecionados. Todos os ponteiros e referências para os elementos transferidos permanecem válidos, mas agora se referem a `*this`, e não a `source`. Iterators que se referem aos elementos transferidos e todos os iterators que se referem a `*this` são invalidados. Iterators para elementos que permanecem em `source` permanecem válidos.

O comportamento é indefinido se `get_allocator() != source.get_allocator()`.

### Parâmetros

source  |  \-  |  container compatível para transferir os nós de   
  
### Valor de retorno

(nenhum) 

  

### Complexidade

Caso médio O(N), pior caso O(N * size() + N), onde N é `source.size()`.

### Exemplo

Execute este código
```
    #include <iostream>
    #include <string>
    #include <unordered_map>
    #include <utility>
     
    // print out a std::pair
    template<class Os, class U, class V>
    Os& operator<<(Os& os, const std::pair<U,V>& p)
    {
        return os << '{' << p.first << ", " << p.second << '}';
    }
     
    // print out an associative container
    template<class Os, class K, class V>
    Os& operator<<(Os& os, const std::unordered_map<K, V>& v)
    {
        os << '[' << v.size() << "] {";
        bool o{};
        for (const auto& e : v)
            os << (o ? ", " : (o = 1, "")) << e;
        return os << "}\n";
    }
     
    int main()
    {
        std::unordered_map<std::string, int>
            p{{"C", 3}, {"B", 2}, {"A", 1}, {"A", 0}},
            q{{"E", 6}, {"E", 7}, {"D", 5}, {"A", 4}};
     
        std::cout << "p: " << p << "q: " << q;
     
        p.merge(q);
     
        std::cout << "p.merge(q);\n" << "p: " << p << "q: " << q;
    }
```

Saída possível: 
```
    p: [3] {{A, 1}, {B, 2}, {C, 3}}
    q: [3] {{A, 4}, {D, 5}, {E, 6}}
    p.merge(q);
    p: [5] {{E, 6}, {D, 5}, {A, 1}, {B, 2}, {C, 3}}
    q: [1] {{A, 4}}
```

### Veja também

[ extract](<#/doc/container/unordered_map/extract>)(C++17) |  extrai nós do container   
(função membro pública)  
[ insert](<#/doc/container/unordered_map/insert>) |  insere elementos ou nós (desde C++17)   
(função membro pública)