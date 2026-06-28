# std::slice_array

Definido no cabeçalho `[<valarray>](<#/doc/header/valarray>)`

```c
template< class T > class slice_array;
```

`std::slice_array` é um template auxiliar usado pelo [operador de subscrito de valarray](<#/doc/numeric/valarray/operator_at>) com argumento [std::slice](<#/doc/numeric/valarray/slice>). Ele possui semântica de referência para um subconjunto do array especificado pelo objeto [std::slice](<#/doc/numeric/valarray/slice>).

### Tipos de membros

Tipo | Definição
---|---
`value_type` | `T`

### Funções de membro

[ (construtor)](<#/doc/numeric/valarray/slice_array/slice_array>) | constrói um `slice_array`
(função de membro pública)
[ (destrutor)](<#/doc/numeric/valarray/slice_array/~slice_array>) | destrói um `slice_array`
(função de membro pública)
[ operator=](<#/>) | atribui conteúdo
(função de membro pública)
[ operator+=operator-=operator*=operator/=operator%=operator&=operator|=operator^=operator<<=operator>>=](<#/doc/numeric/valarray/slice_array/operator_arith>) | executa operação aritmética no array referenciado pelo slice.
(função de membro pública)

### Exemplo

Run this code
```cpp
    #include <iostream>
    #include <valarray>
     
    class Matrix
    {
        int dim;
        std::valarray<int> data;
    public:
        explicit Matrix(int dim, int init = 0)
            : dim{dim}, data(init, dim*dim) {}
        void clear(int value = 0) { data = value; }
        void identity() { clear(); diagonal() = 1; }
        int& operator()(int x, int y) { return data[dim * y + x]; }
     
        std::slice_array<int> diagonal()
        {
            return data[std::slice(0, dim, dim + 1)];
        }
        std::slice_array<int> secondary_diagonal()
        {
            return data[std::slice(dim - 1, dim, dim - 1)];
        }
        std::slice_array<int> row(std::size_t row)
        {
            return data[std::slice(dim * row, dim, 1)];
        }
        std::slice_array<int> column(std::size_t col)
        {
            return data[std::slice(col, dim, dim)];
        }
        template<unsigned, unsigned> friend class MatrixStack;
    };
     
    template<unsigned dim = 3, unsigned max = 8> class MatrixStack
    {
        std::valarray<int> stack;
        unsigned count = 0;
    public:
        MatrixStack() : stack(dim * dim * max) {}
        void print_all() const
        { 
            std::valarray<int> row(dim*count);
            for (unsigned r = 0; r != dim; ++r) // screen row
            {
                row = stack[std::gslice(r * dim, {count, dim}, {dim * dim, 1})];
                for (unsigned i = 0; i != row.size(); ++i)
                    std::cout << row[i] << ((i + 1) % dim ? " " : " │ ");
                std::cout << '\n';
            }
        }
        void push_back(Matrix const& m)
        {
            if (count < max)
            {
                stack[std::slice(count * dim * dim, dim * dim, 1)]
                    = m.data[std::slice(0, dim * dim, 1)];
                ++count;
            }
        }
    };
     
    int main()
    {
        constexpr int dim = 3;
        Matrix m{dim};
        MatrixStack<dim,12> stack;
     
        m.identity();
        stack.push_back(m);
     
        m.clear(1);
        m.secondary_diagonal() = 3;
        stack.push_back(m);
     
        for (int i = 0; i != dim; ++i)
        {
            m.clear();
            m.row(i) = i + 1;
            stack.push_back(m);
        }
     
        for (int i = 0; i != dim; ++i)
        {
            m.clear();
            m.column(i) = i + 1;
            stack.push_back(m);
        }
     
        m.clear();
        m.row(1) = std::valarray<int>{4, 5, 6};
        stack.push_back(m);
     
        m.clear();
        m.column(1) = std::valarray<int>{7, 8, 9};
        stack.push_back(m);
     
        stack.print_all();
    }
```

Saída:
```
    1 0 0 │ 1 1 3 │ 1 1 1 │ 0 0 0 │ 0 0 0 │ 1 0 0 │ 0 2 0 │ 0 0 3 │ 0 0 0 │ 0 7 0 │
    0 1 0 │ 1 3 1 │ 0 0 0 │ 2 2 2 │ 0 0 0 │ 1 0 0 │ 0 2 0 │ 0 0 3 │ 4 5 6 │ 0 8 0 │
    0 0 1 │ 3 1 1 │ 0 0 0 │ 0 0 0 │ 3 3 3 │ 1 0 0 │ 0 2 0 │ 0 0 3 │ 0 0 0 │ 0 9 0 │
```

### Veja também

[ gslice_array](<#/doc/numeric/valarray/gslice_array>) | proxy para um subconjunto de um valarray após aplicar um gslice
(template de classe)