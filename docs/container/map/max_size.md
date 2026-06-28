# std::map&lt;Key,T,Compare,Allocator&gt;::max_size

size_type max_size() const; |  |  (noexcept desde C++11)  

  
Retorna o número máximo de elementos que o container é capaz de armazenar devido a limitações de implementação do sistema ou da biblioteca, ou seja, [std::distance](<#/doc/iterator/distance>)(begin(), end()) para o maior container.

### Parâmetros

(nenhum) 

### Valor de retorno

Número máximo de elementos. 

### Complexidade

Constante. 

### Observações

Este valor tipicamente reflete o limite teórico no tamanho do container, no máximo [std::numeric_limits](<#/doc/types/numeric_limits>)<difference_type>::max(). Em tempo de execução, o tamanho do container pode ser limitado a um valor menor que `max_size()` pela quantidade de RAM disponível. 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <locale>
    #include <map>
     
    int main()
    {
        std::map<char, char> p;
        std::map<long, char> q;
     
        std::cout.imbue(std::locale("en_US.UTF-8"));
        std::cout << std::uppercase
                  << "p.max_size() = " << std::dec << p.max_size() << " = 0x"
                  << std::hex << p.max_size() << '\n'
                  << "q.max_size() = " << std::dec << q.max_size() << " = 0x"
                  << std::hex << q.max_size() << '\n';
    }
```

Saída possível: 
```
    p.max_size() = 461,168,601,842,738,790 = 0x666,666,666,666,666
    q.max_size() = 384,307,168,202,282,325 = 0x555,555,555,555,555
```

### Veja também

[ size](<#/doc/container/map/size>) | retorna o número de elementos   
(função membro pública)  