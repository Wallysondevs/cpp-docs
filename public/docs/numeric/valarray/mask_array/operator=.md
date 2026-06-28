# std::mask_array&lt;T&gt;::operator=

```cpp
void operator=( const T& value ) const;  // (1)
void operator=( const std::valarray<T>& val_arr ) const;  // (2)
const mask_array& operator=( const mask_array& other_arr ) const;  // (3)
```

  
Atribui valores a todos os elementos referenciados.

1) Atribui o valor a todos os elementos.

2) Atribui os elementos de val_arr aos elementos referenciados de *this.

3) Atribui os elementos selecionados de other_arr aos elementos referenciados de *this.

### Parâmetros

value  |  \-  |  um valor para atribuir a todos os elementos referenciados   
---|---|---
val_arr  |  \-  |  [std::valarray](<#/doc/numeric/valarray>) para atribuir   
other_arr  |  \-  |  [std::mask_array](<#/doc/numeric/valarray/mask_array>) para atribuir   
  
### Valor de retorno

1,2) (nenhum)

3) *this

### Exemplo

Execute este código
```cpp 
    #include <iomanip>
    #include <iostream>
    #include <valarray>
     
    void print(std::valarray<int> const& v)
    {
        for (int e : v)
            std::cout << std::setw(2) << e << ' ';
        std::cout << '\n';
    }
     
    int main()
    {
        const auto init = {1, 2, 3, 4, 5, 6, 7, 8};
        std::valarray<int> v;
     
        v = init;
        v[(v % 2) == 0] = 0; // (1)
        print(v);
     
        v = init;
        v[(v % 2) == 1] = std::valarray<int>{-1, -2, -3, -4}; // (2)
        print(v);
     
        v = init;
        v[(v % 2) == 0] = v[(v % 2) == 1]; // (3)
        print(v);
    }
```

Saída: 
```
     1  0  3  0  5  0  7  0 
    -1  2 -2  4 -3  6 -4  8 
     1  1  3  3  5  5  7  7
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 123](<https://cplusplus.github.io/LWG/issue123>) | C++98  | a sobrecarga (2) era não-const  | tornada const   
[LWG 253](<https://cplusplus.github.io/LWG/issue253>) | C++98  | o operador de atribuição de cópia era privado  | tornado público   
[LWG 621](<https://cplusplus.github.io/LWG/issue621>) | C++98  | o operador de atribuição de cópia era não-const  | tornado const 