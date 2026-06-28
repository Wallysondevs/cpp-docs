# std::inplace_vector&lt;T,N&gt;::pop_back

constexpr void pop_back();

  
Remove o último elemento do container.

Chamar `pop_back` em um container vazio resulta em comportamento indefinido.

Iteradores e referências para o último elemento são invalidados. O iterador [`end()`](<#/doc/container/inplace_vector/end>) também é invalidado.

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
    #include <inplace_vector>
    #include <print>
     
    int main()
    {
        std::inplace_vector<int, 4> numbers{1, 2, 3};
        for (; not numbers.empty(); numbers.pop_back())
            std::println("{}", numbers);
    }
```

Saída: 
```
    [1, 2, 3]
    [1, 2]
    [1]
```

### Veja também

[ push_back](<#/doc/container/inplace_vector/push_back>) | adiciona um elemento ao final   
(função membro pública)  