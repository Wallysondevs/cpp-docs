# std::forward_list&lt;T,Allocator&gt;::emplace_after

```cpp
template< class... Args >
iterator emplace_after( const_iterator pos, Args&&... args );  // (desde C++11)
```

  
Insere um novo elemento em uma posição após a posição especificada no container. O elemento é construído no local (in-place), ou seja, nenhuma operação de cópia ou movimentação é realizada. O construtor do elemento é chamado com exatamente os mesmos argumentos fornecidos à função.

Nenhum iterator ou referência é invalidado.

### Parâmetros

pos  |  \-  |  iterator após o qual o novo elemento será construído   
---|---|---
args  |  \-  |  argumentos a serem encaminhados para o construtor do elemento   
  
### Valor de retorno

Iterator para o novo elemento.

### Complexidade

Constante.

### Exceções

Se uma exceção for lançada por qualquer motivo, esta função não tem efeito ([garantia de segurança forte contra exceções](<#/doc/language/exceptions>)).

### Exemplo

O exemplo demonstra um preenchimento canônico de uma lista encadeada simples em ordem natural (em oposição à ordem inversa).

Execute este código
```
    #include <forward_list>
    #include <iostream>
    #include <string>
     
    struct Sum
    {
        std::string remark;
        int sum;
     
        Sum(std::string remark, int sum)
            : remark{std::move(remark)}, sum{sum} {}
     
        void print() const
        {
            std::cout << remark << " = " << sum << '\n';
        }
    };
     
    int main()
    {
        std::forward_list<Sum> list;
     
        auto iter = list.before_begin();
        std::string str{"1"};
     
        for (int i{1}, sum{1}; i != 10; sum += i)
        {
            iter = list.emplace_after(iter, str, sum);
            ++i;
            str += " + " + std::to_string(i);
        }
     
        for (const Sum& s : list)
            s.print();
    }
```

Saída: 
```
    1 = 1
    1 + 2 = 3
    1 + 2 + 3 = 6
    1 + 2 + 3 + 4 = 10
    1 + 2 + 3 + 4 + 5 = 15
    1 + 2 + 3 + 4 + 5 + 6 = 21
    1 + 2 + 3 + 4 + 5 + 6 + 7 = 28
    1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 = 36
    1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 = 45
```

### Ver também

[ insert_after](<#/doc/container/forward_list/insert_after>) |  insere elementos após um elemento   
(função membro pública)  