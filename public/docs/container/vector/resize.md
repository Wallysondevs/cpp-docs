# std::vector&lt;T,Allocator&gt;::resize

void resize( size_type count ); | (1) | (constexpr desde C++20)
---|---|---
void resize( size_type count, const value_type& value ); | (2) | (constexpr desde C++20)

Redimensiona o container para conter count elementos, não faz nada se count == size().

Se o tamanho atual for maior que count, o container é reduzido aos seus primeiros count elementos.

Se o tamanho atual for menor que count, então:

1) Elementos adicionais [default-inserted](<#/doc/named_req/DefaultInsertable>) são anexados.

2) Cópias adicionais de value são anexadas.

### Parâmetros

- **count** — novo tamanho do container
- **value** — o valor para inicializar os novos elementos

### Requisitos de tipo
-`T` deve atender aos requisitos de [MoveInsertable](<#/doc/named_req/MoveInsertable>) e [DefaultInsertable](<#/doc/named_req/DefaultInsertable>) para usar a sobrecarga (1).
-`T` deve atender aos requisitos de [CopyInsertable](<#/doc/named_req/CopyInsertable>) para usar a sobrecarga (2).

### Complexidade

Linear na diferença entre o tamanho atual e count. Complexidade adicional possível devido a realocação se a capacity for menor que count.

### Exceções

Se uma exceção for lançada por qualquer motivo, essas funções não têm efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)). Embora não explicitamente especificado, [std::length_error](<#/doc/error/length_error>) é lançado se a capacity exigida pelo novo `vector` exceder [max_size()](<#/doc/container/vector/max_size>).

```cpp
Na sobrecarga (1), se o move constructor de `T` não for noexcept e `T` não for CopyInsertable em *this, o vector usará o move constructor que lança exceções. Se ele lançar, a garantia é anulada e os efeitos são não especificados.  // (desde C++11)
```

### Notas

Se a value-initialization na sobrecarga ([1](<#/doc/container/vector/resize>)) for indesejável, por exemplo, se os elementos forem de tipo não-classe e o zeramento não for necessário, isso pode ser evitado fornecendo um [custom `Allocator::construct`](<https://stackoverflow.com/a/21028912/273767>).
A capacity do vector nunca é reduzida ao redimensionar para um tamanho menor porque isso invalidaria todos os iterators, em vez de apenas aqueles que seriam invalidados pela sequência equivalente de chamadas a [pop_back()](<#/doc/container/vector/pop_back>).

### Exemplo

Execute este código
```cpp
    #include <vector>
    #include <iostream>
    
    void print(auto rem, const std::vector<int>& c)
    {
        for (std::cout << rem; const int el : c)
            std::cout << el << ' ';
        std::cout << '\n';
    }
    
    int main()
    {
        std::vector<int> c = {1, 2, 3};
        print("The vector holds: ", c);
    
        c.resize(5);
        print("After resize up to 5: ", c);
    
        c.resize(2);
        print("After resize down to 2: ", c);
    
        c.resize(6, 4);
        print("After resize up to 6 (initializer = 4): ", c);
    }
```

Saída:
```
    The vector holds: 1 2 3
    After resize up to 5: 1 2 3 0 0
    After resize down to 2: 1 2
    After resize up to 6 (initializer = 4): 1 2 4 4 4 4
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 679](<https://cplusplus.github.io/LWG/issue679>) | C++98 | `resize()` passava value por valor | passa por referência const
[LWG 1525](<https://cplusplus.github.io/LWG/issue1525>) | C++98 | o comportamento de resize(size()) não era especificado | especificado
[LWG 2033](<https://cplusplus.github.io/LWG/issue2033>) | C++11 | 1. elementos eram removidos usando [erase()](<#/doc/container/vector/erase>)[1](<#/doc/container/vector/resize>)
2. os requisitos de tipo de `T` estavam incorretos | 1. usa [pop_back()](<#/doc/container/vector/pop_back>)
2. corrigido
[LWG 2066](<https://cplusplus.github.io/LWG/issue2066>) | C++11 | a sobrecarga ([1](<#/doc/container/vector/resize>)) não tinha a garantia de segurança de exceção da sobrecarga ([2](<#/doc/container/vector/resize>)) | adicionado
---|---|---|---
[LWG 2160](<https://cplusplus.github.io/LWG/issue2160>) | C++11 | elementos eram removidos usando [pop_back()](<#/doc/container/vector/pop_back>)[2](<#/doc/container/vector/resize>) devido à resolução de LWG 2033 | não especifica o método de remoção de elementos

1. [↑](<#/doc/container/vector/resize>) [erase()](<#/doc/container/vector/erase>) pode remover elementos no meio de um `vector`, então o tipo de valor é exigido ser [MoveAssignable](<#/doc/named_req/MoveAssignable>) para que os elementos seguintes à seção removida possam ser movidos para frente para preencher a lacuna. No entanto, `resize()` só pode remover elementos no final do `vector`, tornando o [MoveAssignable](<#/doc/named_req/MoveAssignable>) desnecessário.
2. [↑](<#/doc/container/vector/resize>) Remover elementos usando [pop_back()](<#/doc/container/vector/pop_back>) implica que os elementos devem ser removidos de trás para frente.

### Ver também

[ max_size](<#/doc/container/vector/max_size>) | retorna o número máximo possível de elementos
(função membro pública)
[ size](<#/doc/container/vector/size>) | retorna o número de elementos
(função membro pública)
[ capacity](<#/doc/container/vector/capacity>) | retorna o número de elementos que podem ser armazenados na memória alocada atualmente
(função membro pública)
[ empty](<#/doc/container/vector/empty>) | verifica se o container está vazio
(função membro pública)