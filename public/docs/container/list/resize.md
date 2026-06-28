# std::list&lt;T,Allocator&gt;::resize

```cpp
void resize( size_type count );  // (1)
void resize( size_type count, const value_type& value );  // (2)
```

Redimensiona o container para conter count elementos, não faz nada se count == size().

Se o tamanho atual for maior que count, o container é reduzido aos seus primeiros count elementos.

Se o tamanho atual for menor que count, então:

1) Elementos adicionais [default-inserted](<#/doc/named_req/DefaultInsertable>) são anexados.

2) Cópias adicionais de value são anexadas.

### Parâmetros

- **count** — novo tamanho do container
- **value** — o valor para inicializar os novos elementos

Requisitos de tipo
-`T` deve atender aos requisitos de [DefaultInsertable](<#/doc/named_req/DefaultInsertable>) para usar a sobrecarga (1).
-`T` deve atender aos requisitos de [CopyInsertable](<#/doc/named_req/CopyInsertable>) para usar a sobrecarga (2).

### Complexidade

Linear na diferença entre o tamanho atual e count.

### Notas

Se a inicialização por valor na sobrecarga ([1](<#/doc/container/list/resize>)) for indesejável, por exemplo, se os elementos forem de um tipo não-classe e a zeragem não for necessária, isso pode ser evitado fornecendo um [`Allocator::construct` personalizado](<https://stackoverflow.com/a/21028912/273767>).

### Exemplo

Execute este código
```
    #include <list>
    #include <iostream>
    
    void print(auto rem, const std::list<int>& c)
    {
        for (std::cout << rem; const int el : c)
            std::cout << el << ' ';
        std::cout << '\n';
    }
    
    int main()
    {
        std::list<int> c = {1, 2, 3};
        print("The list holds: ", c);
    
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
    The list holds: 1 2 3
    After resize up to 5: 1 2 3 0 0
    After resize down to 2: 1 2
    After resize up to 6 (initializer = 4): 1 2 4 4 4 4
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 132](<https://cplusplus.github.io/LWG/issue132>) | C++98 | iterators de acesso aleatório eram usados para determinar o range de exclusão | usar iterators bidirecionais
[LWG 679](<https://cplusplus.github.io/LWG/issue679>) | C++98 | `resize()` passava o valor por valor | passa por referência const
[LWG 1420](<https://cplusplus.github.io/LWG/issue1420>) | C++98 | o comportamento de resize(size()) não era especificado | especificado

### Veja também

[ max_size](<#/doc/container/list/max_size>) | retorna o número máximo possível de elementos
(função membro pública)
[ size](<#/doc/container/list/size>) | retorna o número de elementos
(função membro pública)
[ empty](<#/doc/container/list/empty>) | verifica se o container está vazio
(função membro pública)