# std::forward_list&lt;T,Allocator&gt;::resize

```cpp
void resize( size_type count );  // (1) (desde C++11)
void resize( size_type count, const value_type& value );  // (2) (desde C++11)
```

Redimensiona o container para conter `count` elementos, não faz nada se `count == [std::distance](<#/doc/iterator/distance>)(begin(), end())` (ou seja, se `count` for igual ao tamanho atual).

Se o tamanho atual for maior que `count`, o container é reduzido aos seus primeiros `count` elementos.

Se o tamanho atual for menor que `count`, então:

1) Elementos adicionais [default-inserted](<#/doc/named_req/DefaultInsertable>) são anexados.

2) Cópias adicionais de `value` são anexadas.

### Parâmetros

- **count** — novo tamanho do container
- **value** — o valor para inicializar os novos elementos

Requisitos de tipo
-`T` deve satisfazer os requisitos de [DefaultInsertable](<#/doc/named_req/DefaultInsertable>) para usar a sobrecarga (1).
-`T` deve satisfazer os requisitos de [CopyInsertable](<#/doc/named_req/CopyInsertable>) para usar a sobrecarga (2).

### Complexidade

Linear na diferença entre o tamanho atual e `count`. Complexidade adicional possível devido à travessia da lista para alcançar o primeiro elemento a ser apagado/a posição final para inserção.

### Observações

Se a inicialização por valor na sobrecarga ([1](<#/doc/container/forward_list/resize>)) for indesejável, por exemplo, se os elementos forem de um tipo não-classe e a zeragem não for necessária, ela pode ser evitada fornecendo um [custom `Allocator::construct`](<https://stackoverflow.com/a/21028912/273767>).

### Exemplo

Execute este código
```cpp
    #include <forward_list>
    #include <iostream>
    
    void print(auto rem, const std::forward_list<int>& c)
    {
        for (std::cout << rem; const int el : c)
            std::cout << el << ' ';
        std::cout << '\n';
    }
    
    int main()
    {
        std::forward_list<int> c = {1, 2, 3};
        print("The forward_list holds: ", c);
    
        c.resize(5);
        print("After resize up to 5: ", c);
    
        c.resize(2);
        print("After resize down to 2: ", c);
    
        c.resize(6, 4);
        print("After resize up to 6 (initializer = 4): ", c);
    }
```

Output:
```
    The forward_list holds: 1 2 3
    After resize up to 5: 1 2 3 0 0
    After resize down to 2: 1 2
    After resize up to 6 (initializer = 4): 1 2 4 4 4 4
```

### Veja também

[ max_size](<#/doc/container/forward_list/max_size>) | retorna o número máximo possível de elementos
(função membro pública)
[ empty](<#/doc/container/forward_list/empty>) | verifica se o container está vazio
(função membro pública)