# std::set&lt;Key,Compare,Allocator&gt;::merge

```cpp
template< class C2 >
void merge( std::set<Key, C2, Allocator>& source );  // (1) (desde C++17)
template< class C2 >
void merge( std::set<Key, C2, Allocator>&& source );  // (2) (desde C++17)
template< class C2 >
void merge( std::multiset<Key, C2, Allocator>& source );  // (3) (desde C++17)
template< class C2 >
void merge( std::multiset<Key, C2, Allocator>&& source );  // (4) (desde C++17)
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

N * log(size() + N)), onde N é `source.size()`. 

### Exemplo

Execute este código
```cpp 
    #include <iostream>
    #include <set>
     
    // imprime um container
    template<class Os, class K>
    Os& operator<<(Os& os, const std::set<K>& v)
    {
        os << '[' << v.size() << "] {";
        bool o{};
        for (const auto& e : v)
            os << (o ? ", " : (o = 1, " ")) << e;
        return os << " }\n";
    }
     
    int main()
    {
        std::set<char>
            p{'C', 'B', 'B', 'A'}, 
            q{'E', 'D', 'E', 'C'};
     
        std::cout << "p: " << p << "q: " << q;
     
        p.merge(q);
     
        std::cout << "p.merge(q);\n" << "p: " << p << "q: " << q;
    }
```

Saída: 
```
    p: [3] { A, B, C }
    q: [3] { C, D, E }
    p.merge(q);
    p: [5] { A, B, C, D, E }
    q: [1] { C }
```

### Ver também

[ extract](<#/doc/container/set/extract>)(C++17) |  extrai nós do container   
(função membro pública)  
[ insert](<#/doc/container/set/insert>) |  insere elementos ou nós(desde C++17)   
(função membro pública)