# std::deque&lt;T,Allocator&gt;::pop_back

void pop_back();

  
Remove o último elemento do container. 

Chamar `pop_back` em um container vazio resulta em comportamento indefinido. 

Iterators e referências para o último elemento são invalidados. O iterator [`end()`](<#/doc/container/deque/end>) também é invalidado. 

### Parâmetros

(nenhum) 

### Valor de retorno

(nenhum) 

### Complexidade

Constante. 

### Exceções

Não lança exceções. 

### Exemplo

Execute este código
```
    #include <deque>
    #include <iostream>
     
    namespace stq {
    template<typename T>
    void println(auto, const T& xz)
    {
        std::cout << '[';
        bool first{true};
        for (auto const& x : xz)
            std::cout << (first ? first = false, "" : ", ") << x;
        std::cout << "]\n";
    }
    }
     
    int main()
    {
        std::deque<int> numbers{1, 2, 3};
        stq::println("{}", numbers);
        while (not numbers.empty())
        {
            numbers.pop_back();
            stq::println("{}", numbers);
        }
    }
```

Saída: 
```
    [1, 2, 3]
    [1, 2]
    [1]
    []
```

### Veja também

[ pop_front](<#/doc/container/deque/pop_front>) |  remove o primeiro elemento   
(função membro pública)  
[ push_back](<#/doc/container/deque/push_back>) |  adiciona um elemento ao final   
(função membro pública)