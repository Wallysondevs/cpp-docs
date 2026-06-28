# std::deque&lt;T,Allocator&gt;::resize

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

count  |  \-  |  novo tamanho do container   
---|---|---
value  |  \-  |  o valor para inicializar os novos elementos   
Requisitos de tipo   
-`T` deve satisfazer os requisitos de [MoveInsertable](<#/doc/named_req/MoveInsertable>) e [DefaultInsertable](<#/doc/named_req/DefaultInsertable>) para usar a sobrecarga (1).   
-`T` deve satisfazer os requisitos de [CopyInsertable](<#/doc/named_req/CopyInsertable>) para usar a sobrecarga (2).   
  
### Complexidade

Linear na diferença entre o tamanho atual e count.

### Notas

Se a inicialização por valor na sobrecarga ([1](<#/doc/container/deque/resize>)) for indesejável, por exemplo, se os elementos forem de um tipo não-classe e a zeragem não for necessária, isso pode ser evitado fornecendo um [custom `Allocator::construct`](<https://stackoverflow.com/a/21028912/273767>).

### Exemplo

Execute este código
```
    #include <deque>
    #include <iostream>
     
    void print(auto rem, const std::deque<int>& c)
    {
        for (std::cout << rem; const int el : c)
            std::cout << el << ' ';
        std::cout << '\n';
    }
     
    int main()
    {
        std::deque<int> c = {1, 2, 3};
        print("The deque holds: ", c);
     
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
    The deque holds: 1 2 3
    After resize up to 5: 1 2 3 0 0
    After resize down to 2: 1 2
    After resize up to 6 (initializer = 4): 1 2 4 4 4 4
```

### Relatórios de Defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 679](<https://cplusplus.github.io/LWG/issue679>) | C++98  | `resize()` passava value por valor  | passa por referência const   
[LWG 1418](<https://cplusplus.github.io/LWG/issue1418>) | C++98  | o comportamento de resize(size()) não era especificado  | especificado   
[LWG 2033](<https://cplusplus.github.io/LWG/issue2033>) | C++11  | 1. elementos eram removidos usando [erase()](<#/doc/container/deque/erase>)[1](<#/doc/container/deque/resize>)  
2. `T` não era exigido ser [MoveInsertable](<#/doc/named_req/MoveInsertable>) | 1. usa [pop_back()](<#/doc/container/deque/pop_back>)  
2. exigido   
[LWG 2066](<https://cplusplus.github.io/LWG/issue2066>) | C++11  | a sobrecarga ([1](<#/doc/container/deque/resize>)) não tinha a garantia de segurança
---|---|---
de exceção da sobrecarga ([2](<#/doc/container/deque/resize>)) | adicionada   
[LWG 2160](<https://cplusplus.github.io/LWG/issue2160>) | C++11  | elementos eram removidos usando [pop_back()](<#/doc/container/deque/pop_back>)[2](<#/doc/container/deque/resize>)  
devido à resolução de LWG 2033  | não especifica o método  
de remoção de elementos   
  
  1. [↑](<#/doc/container/deque/resize>) [erase()](<#/doc/container/deque/erase>) pode remover elementos no meio de um `deque`, então o tipo de valor é exigido ser [MoveAssignable](<#/doc/named_req/MoveAssignable>) para que os elementos seguintes à seção removida possam ser movidos para frente para preencher a lacuna. No entanto, `resize()` só pode remover elementos no final do `deque`, tornando o [MoveAssignable](<#/doc/named_req/MoveAssignable>) desnecessário.
  2. [↑](<#/doc/container/deque/resize>) Remover elementos usando [pop_back()](<#/doc/container/deque/pop_back>) implica que os elementos devem ser removidos de trás para frente.

### Veja também

[ max_size](<#/doc/container/deque/max_size>) | retorna o número máximo possível de elementos   
(função membro pública)  
[ size](<#/doc/container/deque/size>) | retorna o número de elementos   
(função membro pública)  
[ empty](<#/doc/container/deque/empty>) | verifica se o container está vazio   
(função membro pública)