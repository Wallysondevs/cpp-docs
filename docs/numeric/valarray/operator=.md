# std::valarray&lt;T&gt;::operator=

```cpp
valarray<T>& operator=( const valarray<T>& other );  // (1)
valarray<T>& operator=( valarray<T>&& other ) noexcept;  // (2) (desde C++11)
valarray<T>& operator=( const T& val );  // (3)
valarray<T>& operator=( const std::slice_array<T>& other );  // (4)
valarray<T>& operator=( const std::gslice_array<T>& other );  // (5)
valarray<T>& operator=( const std::mask_array<T>& other );  // (6)
valarray<T>& operator=( const std::indirect_array<T>& other );  // (7)
valarray<T>& operator=( std::initializer_list<T> il );  // (8) (desde C++11)
```

  
Substitui o conteúdo do array numérico.

1) Operador de atribuição por cópia. Se size() != other.size(), primeiro redimensiona *this como se por resize(other.size()). Cada elemento de *this recebe o valor do elemento correspondente de other.

2) Operador de atribuição por movimento (move assignment operator). Substitui o conteúdo de *this pelo de other. O valor de other é não especificado após esta operação. A complexidade desta operação pode ser linear se T tiver destrutores não triviais, mas geralmente é constante caso contrário.

3) Substitui cada valor em *this por uma cópia de val.

4-7) Substitui o conteúdo de *this pelo resultado de uma operação de indexação generalizada (generalized subscripting operation). O comportamento é indefinido se [`size()`](<#/doc/numeric/valarray/size>) não for igual ao comprimento de other ou se qualquer valor à esquerda depender do valor à direita (por exemplo, v = v[v > 2]).

8) Atribui o conteúdo da initializer list il. Equivalente a *this = valarray(il).

### Parameters

other  |  \-  |  outro array numérico (ou uma máscara) para atribuir   
---|---|---
val  |  \-  |  o valor para inicializar cada elemento   
il  |  \-  |  initializer list para atribuir   
  
### Return value

*this

### Exceptions

1,3-8) Pode lançar exceções definidas pela implementação.

### Example

Execute este código
```
    #include <iomanip>
    #include <iostream>
    #include <valarray>
     
    void print(const char* rem, const std::valarray<int>& v)
    {
        std::cout << std::left << std::setw(36) << rem << std::right;
        for (int n : v)
            std::cout << std::setw(3) << n;
        std::cout << '\n';
    }
     
    int main()
    {
        std::valarray<int> v1(3);
        v1 = -1; // (3) from a scalar 
        print("assigned from scalar: ", v1);
     
        v1 = {1, 2, 3, 4, 5, 6}; // (8): from initializer list of different size
        print("assigned from initializer_list:", v1);
     
        std::valarray<int> v2(3);
        v2 = v1[std::slice(0, 3, 2)]; // (4): from slice array
        print("every 2nd element starting at pos 0:", v2);
     
        v2 = v1[v1 % 2 == 0]; // (6): from mask array
        print("values that are even:", v2);
     
        std::valarray<std::size_t> idx = {0, 1, 2, 4}; // index array
        v2.resize(4); // sizes must match when assigning from gen subscript
        v2 = v1[idx]; // (7): from indirect array
        print("values at positions 0, 1, 2, 4:", v2);
    }
```

Output: 
```
    assigned from scalar:                -1 -1 -1
    assigned from initializer_list:       1  2  3  4  5  6
    every 2nd element starting at pos 0:  1  3  5
    values that are even:                 2  4  6
    values at positions 0, 1, 2, 4:       1  2  3  5
```

### Defect reports

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento publicado  | Comportamento correto   
---|---|---|---
[LWG 624](<https://cplusplus.github.io/LWG/issue624>) | C++98  | os comportamentos das sobrecargas (4-7) eram pouco claros se o comprimento de other não fosse [`size()`](<#/doc/numeric/valarray/size>) | os comportamentos são indefinidos neste caso   
[LWG 630](<https://cplusplus.github.io/LWG/issue630>) | C++98  | o comportamento do operador de atribuição por cópia era indefinido se size() != other.size() | redimensiona *this primeiro neste caso   
[LWG 2071](<https://cplusplus.github.io/LWG/issue2071>) | C++11  | o operador de atribuição por movimento redimensionava *this se size() != other.size() | não é necessário redimensionar neste caso 