# Cabeçalho da biblioteca padrão &lt;typeinfo&gt;

Este cabeçalho faz parte da biblioteca de [suporte a tipos](<#/doc/types>).

### Classes

[ type_info](<#/doc/types/type_info>) | contém informações de algum tipo, a classe retornada pelo operador typeid
(classe)
[ bad_typeid](<#/doc/types/bad_typeid>) | exceção lançada se um argumento em uma [expressão typeid](<#/doc/language/typeid>) for nulo
(classe)
[ bad_cast](<#/doc/types/bad_cast>) | exceção lançada por uma expressão [`dynamic_cast`](<#/doc/language/dynamic_cast>) inválida, ou seja, uma conversão de tipo de referência falha
(classe)

### Sinopse
```cpp
    namespace std {
      class type_info;
      class bad_cast;
      class bad_typeid;
    }
```

#### Classe [std::type_info](<#/doc/types/type_info>)
```cpp
    namespace std {
      class type_info {
      public:
        virtual ~type_info();
        constexpr bool operator==(const type_info& rhs) const noexcept;
        bool before(const type_info& rhs) const noexcept;
        size_t hash_code() const noexcept;
        const char* name() const noexcept;
    
        type_info(const type_info&) = delete;                   // não pode ser copiado
        type_info& operator=(const type_info&) = delete;        // não pode ser copiado
      };
    }
```

#### Classe [std::bad_cast](<#/doc/types/bad_cast>)
```cpp
    namespace std {
      class bad_cast : public exception {
      public:
        // veja [exception] para a especificação das funções membro especiais
        const char* what() const noexcept override;
      };
    }
```

#### Classe [std::bad_typeid](<#/doc/types/bad_typeid>)
```cpp
    namespace std {
      class bad_typeid : public exception {
      public:
        // veja [exception] para a especificação das funções membro especiais
        const char* what() const noexcept override;
      };
    }
```