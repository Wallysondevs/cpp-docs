# std::slice_array&lt;T&gt;::operator=

```cpp
void operator=( const T& value ) const;  // (1)
void operator=( const std::valarray<T>& val_arr ) const;  // (2)
const slice_array& operator=( const slice_array& other_arr ) const;  // (3)
```

Atribui valores a todos os elementos referenciados.

1) Atribui o valor a todos os elementos.

2) Atribui os elementos de `val_arr` aos elementos referenciados por `*this`.

3) Atribui os elementos selecionados de `other_arr` aos elementos referenciados por `*this`.

### Parâmetros

- **value** — um valor para atribuir a todos os elementos referenciados
- **val_arr** — [std::valarray](<#/doc/numeric/valarray>) para atribuir
- **other_arr** — [std::slice_array](<#/doc/numeric/valarray/slice_array>) para atribuir

### Valor de retorno

1,2) (nenhum)

3) `*this`

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <valarray>
     
    void print(char const* remark, std::valarray<int> const& v = {})
    {
        std::cout << remark;
        if (v.size() != 0)
        {
            std::cout << ':';
            for (int e : v)
                std::cout << ' ' << e;
        }
        std::cout << '\n';
    }
     
    int main()
    {
        std::valarray<int> v1{1, 2, 3, 4, 5, 6, 7, 8};
        std::slice_array<int> s1 = v1[std::slice(1, 4, 2)];
        print("v1", v1);
        print("s1", s1);
     
        print("\n(1) operator=( const T& )");
        print("s1 = 42");
        s1 = 42; // (1)
        print("s1", s1);
        print("v1", v1);
     
        print("\n(2) operator=( const std::valarray<T>& )");
        std::valarray<int> v2{10, 11, 12, 13, 14, 15};
        print("v2", v2);
        print("s1 = v2");
        s1 = v2; // (2)
        print("s1", s1);
        print("v1", v1);
     
        print("\n(3) operator=( const slice_array& )");
        v1 = {1, 2, 3, 4, 5, 6, 7, 8};
        std::slice_array<int> s2 = v1[std::slice(0, 4, 1)];
        std::slice_array<int> s3 = v2[std::slice(1, 4, 1)];
        print("v1", v1);
        print("v2", v2);
        print("s2", s2);
        print("s3", s3);
        print("s2 = s3");
        s2 = s3; // (3) Note: LHS and RHS must have same size.
        print("s2", s2);
        print("v1", v1);
    }
```

Saída:
```
    v1: 1 2 3 4 5 6 7 8
    s1: 2 4 6 8
     
    (1) operator=( const T& )
    s1 = 42
    s1: 42 42 42 42
    v1: 1 42 3 42 5 42 7 42
     
    (2) operator=( const std::valarray<T>& )
    v2: 10 11 12 13 14 15
    s1 = v2
    s1: 10 11 12 13
    v1: 1 10 3 11 5 12 7 13
     
    (3) operator=( const slice_array& )
    v1: 1 2 3 4 5 6 7 8
    v2: 10 11 12 13 14 15
    s2: 1 2 3 4
    s3: 11 12 13 14
    s2 = s3
    s2: 11 12 13 14
    v1: 11 12 13 14 5 6 7 8
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 123](<https://cplusplus.github.io/LWG/issue123>) | C++98 | a sobrecarga (2) era não-const | tornou-se const
[LWG 253](<https://cplusplus.github.io/LWG/issue253>) | C++98 | o operador de atribuição de cópia era privado | tornou-se público
[LWG 621](<https://cplusplus.github.io/LWG/issue621>) | C++98 | o operador de atribuição de cópia era não-const | tornou-se const