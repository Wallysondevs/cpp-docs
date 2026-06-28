# std::bitset&lt;N&gt;::reference

class reference;

  
A classe [std::bitset](<#/doc/utility/bitset>) inclui `std::bitset::reference` como uma classe aninhada publicamente acessível. Esta classe é usada como um objeto proxy para permitir que os usuários interajam com bits individuais de um bitset, uma vez que os tipos padrão de C++ (como referências e ponteiros) não são construídos com precisão suficiente para especificar bits individuais.

O uso principal de `std::bitset::reference` é fornecer um lvalue que pode ser retornado de [`operator[]`](<#/doc/utility/bitset/operator_at>).

Quaisquer leituras ou escritas em um bitset que ocorram via `std::bitset::reference` podem ler ou escrever em todo o bitset subjacente.

### Funções membro

(construtor) |  constrói a referência. Não há construtor padrão. O construtor de cópia é implicitamente declarado (até C++11) padronizado (desde C++11). Pode haver um construtor interno que é acessível apenas ao próprio [std::bitset](<#/doc/utility/bitset>).   
(função membro pública)  
**(destrutor)** |  destrói a referência   
(função membro pública)  
operator= |  atribui um bool ao bit referenciado   
(função membro pública)  
** operator bool** |  retorna o bit referenciado   
(função membro pública)  
operator~ |  retorna o bit referenciado invertido   
(função membro pública)  
flip |  inverte o bit referenciado   
(função membro pública)  
  
##  std::bitset&lt;N&gt;::reference::~reference

~reference(); |  |  (constexpr desde C++23)  

  
Destrói a referência.

##  std::bitset&lt;N&gt;::reference::operator=

```cpp
  // (1)
reference& operator=( bool x );  // (até C++11)
reference& operator=( bool x ) noexcept;  // (desde C++11)
(constexpr desde C++23)
  // (2)
reference& operator=( const reference& x );  // (até C++11)
reference& operator=( const reference& x ) noexcept;  // (desde C++11)
(constexpr desde C++23)
```

  
Atribui um valor ao bit referenciado.

###  Parâmetros

x  |  \-  |  valor a atribuir   
  
###  Valor de retorno

*this

##  std::bitset&lt;N&gt;::reference::operator bool

```cpp
operator bool() const;  // (até C++11)
operator bool() const noexcept;  // (desde C++11)
(constexpr desde C++23)
```

  
Retorna o valor do bit referenciado.

###  Parâmetros

(nenhum)

###  Valor de retorno

O bit referenciado.

##  std::bitset&lt;N&gt;::reference::operator~

```cpp
bool operator~() const;  // (até C++11)
bool operator~() const noexcept;  // (desde C++11)
(constexpr desde C++23)
```

  
Retorna o inverso do bit referenciado.

###  Parâmetros

(nenhum)

###  Valor de retorno

O inverso do bit referenciado.

##  std::bitset&lt;N&gt;::reference::flip

```cpp
reference& flip();  // (até C++11)
reference& flip() noexcept;  // (desde C++11)
(constexpr desde C++23)
```

  
Inverte o bit referenciado.

###  Parâmetros

(nenhum)

###  Valor de retorno

*this

### Exemplo

Execute este código
```cpp
    #include <bitset>
    #include <iostream>
    
    int main()
    {
        std::bitset<4> bs{0b1110};
        std::bitset<4>::reference ref = bs[2];
    
        auto info = &
        {
            std::cout << id << ") bs: " << bs << "; ref bit: " << ref << '\n';
        };
    
        info(1);
        ref = false;
        info(2);
        ref = true;
        info(3);
        ref.flip();
        info(4);
        ref = bs[1]; // operator=( const reference& x )
        info(5);
    
        std::cout << "6) ~ref bit: " << ~ref << '\n';
    }
```

Saída:
```
    1) bs: 1110; ref bit: 1
    2) bs: 1010; ref bit: 0
    3) bs: 1110; ref bit: 1
    4) bs: 1010; ref bit: 0
    5) bs: 1110; ref bit: 1
    6) ~ref bit: 0
```

### Veja também

[ operator[]](<#/doc/utility/bitset/operator_at>) |  acessa um bit específico   
(função membro pública)  