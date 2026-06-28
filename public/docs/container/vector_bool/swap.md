# std::vector&lt;bool,Allocator&gt;::swap

Definido no cabeçalho `[<vector>](<#/doc/header/vector>)`

```c
static void swap( reference x, reference y );
```

  
Troca o conteúdo de x e y como se por bool b = x; x = y; y = b;.

### Parâmetros

x  |  \-  |  [`std::vector`](<#/doc/container/vector_bool>)&lt;bool&gt;::[`reference`](<#/doc/container/vector_bool/reference>) valor para trocar com y  
---|---|---
y  |  \-  |  [`std::vector`](<#/doc/container/vector_bool>)&lt;bool&gt;::[`reference`](<#/doc/container/vector_bool/reference>) valor para trocar com x  
  
### Valor de retorno

(nenhum) 

### Complexidade

Constante. 

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <vector>
    
    void println(std::string_view fmt, std::vector<bool> const& vb = {})
    {
        for (std::cout << fmt; bool const e : vb)
            std::cout << e << ' ';
        std::cout << '\n';
    }
    
    int main()
    {
        println("swap elements of the same vector:");
        std::vector<bool> x{1, 0};
        println("before swap, x: ", x);
        x.swap(x[0], x[1]); // same as std::vector<bool>::swap(x[0], x[1]);
        println("after swap,  x: ", x);
    
        println("swap elements of two different vectors:");
        std::vector<bool> y{0, 0, 1};
        println("before swap, x: ", x);
        println("before swap, y: ", y);
        y.swap(x[0], y[2]); // same as std::vector<bool>::swap(x[0], y[2]);
        println("after swap,  x: ", x);
        println("after swap,  y: ", y);
    }
```

Saída: 
```
    swap elements of the same vector:
    before swap, x: 1 0 
    after swap,  x: 0 1 
    swap elements of two different vectors:
    before swap, x: 0 1 
    before swap, y: 0 0 1 
    after swap,  x: 1 1 
    after swap,  y: 0 0 0
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento como publicado  | Comportamento correto   
---|---|---|---
[LWG 814](<https://cplusplus.github.io/LWG/issue814>) | C++98  | a descrição desta função membro estava faltando  | adicionado   
  
### Veja também

[ reference](<#/doc/container/vector_bool/reference>) |  classe proxy representando uma referência a um único bool   
(class)  
[ swap](<#/doc/container/vector/swap>) |  troca o conteúdo   
(public member function of `std::vector<T,Allocator>`)  
[ std::swap(std::vector)](<#/doc/container/vector/swap2>) |  especializa o algoritmo [std::swap](<#/doc/utility/swap>)   
(function template)