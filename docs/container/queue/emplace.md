# std::queue&lt;T,Container&gt;::emplace

```cpp
template< class... Args >
void emplace( Args&&... args );  // (desde C++11)
(ate C++17)
template< class... Args >
decltype(auto) emplace( Args&&... args );  // (desde C++17)
```

  
Adiciona um novo elemento ao final da fila. O elemento é construído no local (in-place), ou seja, nenhuma operação de cópia ou movimentação é realizada. O construtor do elemento é chamado com exatamente os mesmos argumentos fornecidos à função. 

Efetivamente chama c.emplace_back([std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...);. 

### Parâmetros

args  |  \-  |  argumentos a serem encaminhados para o construtor do elemento   
  
### Valor de retorno

(nenhum)  | (ate C++17)  
---|---
O valor ou referência, se houver, retornado pela chamada acima para Container::emplace_back.  | (desde C++17)  
  
### Complexidade

Idêntica à complexidade de Container::emplace_back. 

### Exemplo

Execute este código
```cpp 
    #include <iostream>
    #include <queue>
    
    struct S
    {
        int id;
    
        S(int i, double d, std::string s) : id{i}
        {
            std::cout << "S::S(" << i << ", " << d << ", \"" << s << "\");\n";
        }
    };
    
    int main()
    {
        std::queue<S> queue;
        const S& s = queue.emplace(42, 3.14, "C++"); // for return value C++17 required
        std::cout << "id = " << s.id << '\n';
    }
```

Saída: 
```
    S::S(42, 3.14, "C++")
    id = 42
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2783](<https://cplusplus.github.io/LWG/issue2783>) | C++17  | `emplace` retornava referência, quebrando a compatibilidade com containers pré-C++17  | retorna `decltype(auto)`  
  
### Veja também

[ push](<#/doc/container/queue/push>) |  insere elemento no final   
(função membro pública)  
[ pop](<#/doc/container/queue/pop>) |  remove o primeiro elemento   
(função membro pública)