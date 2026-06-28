# std::basic_stacktrace&lt;Allocator&gt;::max_size

```cpp
size_type max_size() const noexcept;  // (desde C++23)
```

  
Retorna o número máximo de elementos que o container subjacente (tipicamente um [std::vector](<#/doc/container/vector>)) é capaz de armazenar devido a limitações de implementação do sistema ou da biblioteca, ou seja, [std::distance](<#/doc/iterator/distance>)(begin(), end()) para o maior container subjacente. 

### Parâmetros

(nenhum) 

### Valor de retorno

Número máximo de elementos. 

### Complexidade

Constante. 

### Notas

Este valor tipicamente reflete o limite teórico no tamanho do container subjacente, no máximo [std::numeric_limits](<#/doc/types/numeric_limits>)<difference_type>::max(). Em tempo de execução, o tamanho do container pode ser limitado a um valor menor que `max_size()` pela quantidade de RAM disponível. 

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <stacktrace>
     
    int main()
    {
        std::stacktrace trace;
        std::cout << "Maximum size of a 'basic_stacktrace' is " << trace.max_size() << "\n";
    }
```

Saída possível: 
```
    Maximum size of a 'basic_stacktrace' is 1152921504606846975
```

### Veja também

[ size](<#/doc/utility/basic_stacktrace/size>) |  retorna o número de entradas do stacktrace   
(função membro pública)  