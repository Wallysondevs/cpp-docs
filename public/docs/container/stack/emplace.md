# std::stack&lt;T,Container&gt;::emplace

```cpp
template< class... Args >
void emplace( Args&&... args );  // (desde C++11)
(ate C++17)
template< class... Args >
decltype(auto) emplace( Args&&... args );  // (desde C++17)
```

  
Empurra um novo elemento para o topo da pilha. O elemento é construído no local (in-place), ou seja, nenhuma operação de cópia ou movimentação é realizada. O construtor do elemento é chamado com exatamente os mesmos argumentos fornecidos à função. 

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
```
    #include <iostream>
    #include <stack>
     
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
        std::stack<S> stack;
        const S& s = stack.emplace(42, 3.14, "C++"); // para valor de retorno C++17 é necessário
        std::cout << "id = " << s.id << '\n';
    }
```

Saída: 
```
    S::S(42, 3.14, "C++")
    id = 42
```

###  Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2783](<https://cplusplus.github.io/LWG/issue2783>) | C++17  | `emplace` retornava referência, quebrando a compatibilidade com containers pré-C++17  | retorna `decltype(auto)`  
  
### Veja também

[ push](<#/doc/container/stack/push>) |  insere elemento no topo   
(função membro pública)  
[ pop](<#/doc/container/stack/pop>) |  remove o elemento do topo   
(função membro pública)