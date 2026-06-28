# std::indirect_array&lt;T&gt;::operator=

```cpp
void operator=( const T& value ) const;  // (1)
void operator=( const std::valarray<T>& val_arr ) const;  // (2)
const indirect_array& operator=( const indirect_array& other_arr ) const;  // (3)
```

  
Atribui valores a todos os elementos referenciados.

1) Atribui `value` a todos os elementos.

2) Atribui os elementos de `val_arr` aos elementos referenciados por `*this`.

3) Atribui os elementos selecionados de `other_arr` aos elementos referenciados por `*this`.

### Parâmetros

value  |  \-  |  um valor para atribuir a todos os elementos referenciados   
---|---|---
val_arr  |  \-  |  [std::valarray](<#/doc/numeric/valarray>) para atribuir   
other_arr  |  \-  |  [std::indirect_array](<#/doc/numeric/valarray/indirect_array>) para atribuir   
  
### Valor de retorno

1,2) (nenhum)

3) `*this`

### Exemplo

Run this code
```
    #include <iomanip>
    #include <iostream>
    #include <numeric>
    #include <valarray>
     
    void print(int n, std::valarray<int> const& v)
    {
        std::cout << n << ':';
        for (int e : v)
            std::cout << std::setw(3) << e;
        std::cout << '\n';
    }
     
    int main()
    {
        std::valarray<int> v(8);
        std::iota(std::begin(v), std::end(v), 0);
        print(1, v);
     
        std::valarray<std::size_t> idx{1, 3, 5, 7};
        const std::indirect_array<int> ia = v[idx];
        // 'ia' refers to v[1], v[3], v[5], v[7]
        ia = -1; // (1), effectively:
                 // v[1] = v[3] = v[5] = v[7] = -1;
        print(2, v);
     
        ia = /*std::valarray<int>*/{-1, -2, -3, -4}; // (2),
            // effectively: v[1] = -1, v[3] = -2, v[5] = -3, v[7] = -4;
        print(3, v);
     
        std::valarray<std::size_t> idx2{0, 2, 4, 6};
        const std::indirect_array<int> ia2 = v[idx2];
        // 'ia2' refers to v[0], v[2], v[4], v[6]
        ia = ia2; // (3), effectively:
                  // v[1] = v[0], v[3] = v[2], v[5] = v[4], v[7] = v[6];
        print(4, v);
    }
```

Saída: 
```
    1:  0  1  2  3  4  5  6  7
    2:  0 -1  2 -1  4 -1  6 -1
    3:  0 -1  2 -2  4 -3  6 -4
    4:  0  0  2  2  4  4  6  6
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 123](<https://cplusplus.github.io/LWG/issue123>) | C++98  | a sobrecarga (2) era não-const  | tornada const   
[LWG 253](<https://cplusplus.github.io/LWG/issue253>) | C++98  | o operador de atribuição de cópia era privado  | tornada pública   
[LWG 621](<https://cplusplus.github.io/LWG/issue621>) | C++98  | o operador de atribuição de cópia era não-const  | tornada const 