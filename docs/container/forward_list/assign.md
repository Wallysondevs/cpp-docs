# std::forward_list&lt;T,Allocator&gt;::assign

```cpp
void assign( size_type count, const T& value );  // (1) (desde C++11)
template< class InputIt >
void assign( InputIt first, InputIt last );  // (2) (desde C++11)
void assign( std::initializer_list<T> ilist );  // (3) (desde C++11)
```

  
Substitui o conteúdo do container.

1) Substitui o conteúdo por `count` cópias do valor `value`.

2) Substitui o conteúdo por cópias dos elementos no range `[`first`, `last`)`.

Se qualquer um dos argumentos for um iterator para *this, o comportamento é indefinido. Esta sobrecarga tem o mesmo efeito que a sobrecarga (1) se `InputIt` for um tipo integral. | (até C++11)  
---|---
Esta sobrecarga participa da resolução de sobrecarga apenas se `InputIt` satisfizer [LegacyInputIterator](<#/doc/named_req/InputIterator>). | (desde C++11)  
  
3) Substitui o conteúdo pelos elementos de `ilist`.

Todos os iterators, ponteiros e referências aos elementos do container são invalidados.

### Parâmetros

count  |  \-  |  o novo tamanho do container   
---|---|---
value  |  \-  |  o valor para inicializar os elementos do container   
first, last  |  \-  |  o range de onde copiar os elementos   
ilist  |  \-  |  [std::initializer_list](<#/doc/utility/initializer_list>) de onde copiar os valores   
  
### Complexidade

1) Linear em `count`.

2) Linear na distância entre `first` e `last`.

3) Linear em `ilist.size()`.

### Exemplo

O código a seguir usa `assign` para adicionar vários caracteres a uma [std::forward_list](<#/doc/container/forward_list>)&lt;char&gt;:

Execute este código
```
    #include <forward_list>
    #include <iostream>
    #include <string>
     
    int main()
    {
        std::forward_list<char> characters;
     
        auto print_forward_list = &
        {
            for (char c : characters)
                std::cout << c << ' ';
            std::cout << '\n';
        };
     
        characters.assign(5, 'a');
        print_forward_list();
     
        const std::string extra(6, 'b');
        characters.assign(extra.begin(), extra.end());
        print_forward_list();
     
        characters.assign({'C', '+', '+', '1', '1'});
        print_forward_list();
    }
```

Saída: 
```
    a a a a a
    b b b b b b
    C + + 1 1
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2209](<https://cplusplus.github.io/LWG/issue2209>) | C++11  | a operação de substituição era exigida para ser implementada como a remoção de todos os elementos existentes seguida pela inserção dos elementos fornecidos  | removeu a exigência   
  
### Veja também

[ assign_range](<#/doc/container/forward_list/assign_range>)(C++23) |  atribui um range de valores ao container   
(função membro pública)  
[ operator=](<#/>) |  atribui valores ao container   
(função membro pública)