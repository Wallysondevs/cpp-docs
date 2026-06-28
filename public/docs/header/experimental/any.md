# Cabeçalho de biblioteca experimental &lt;experimental/any&gt;

Este cabeçalho faz parte do Library Fundamentals TS ([v1](<#/doc/experimental/memory>), [v2](<#/doc/experimental/lib_extensions_2>)).   
  
### Classes

Nome  |  Descrição   
---|---
[ bad_any_cast](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/bad_any_cast&action=edit&redlink=1> "cpp/experimental/bad any cast \(page does not exist\)")(library fundamentals TS) |  exceção lançada por um `any_cast` falho.   
(classe)  
[ any](<#/doc/experimental/any>)(library fundamentals TS) |  Objetos que armazenam instâncias de qualquer tipo que satisfaça os requisitos de `ValueType`.   
(classe)  
  
### Funções

[ swap](<#/doc/experimental/any/swap2>) |  troca o conteúdo de duas instâncias de `any`   
(função)  
[ any_cast](<#/doc/experimental/any/any_cast>) |  acesso type-safe ao objeto contido   
(modelo de função)  
  
### Sinopse
```
    namespace std {
    namespace experimental {
    inline namespace fundamentals_v1 {
     
      class bad_any_cast : public bad_cast
      {
      public:
        virtual const char* what() const noexcept;
      };
     
      class any
      {
      public:
        // 6.3.1, any construct/destruct
        any() noexcept;
     
        any(const any& other);
        any(any&& x) noexcept;
     
        template <class ValueType>
            any(ValueType&& value);
     
        ~any();
     
        // 6.3.2, any assignments
        any& operator=(const any& rhs);
        any& operator=(any&& rhs) noexcept;
     
        template <class ValueType>
          any& operator=(ValueType&& rhs);
     
        // 6.3.3, any modifiers
        void clear() noexcept;
        void swap(any& rhs) noexcept;
     
        // 6.3.4, any observers
        bool empty() const noexcept;
        const type_info& type() const noexcept;
      };
     
      // 6.4, Non-member functions
      void swap(any& x, any& y) noexcept;
     
      template<class ValueType>
        ValueType any_cast(const any& operand);
      template<class ValueType>
        ValueType any_cast(any& operand);
      template<class ValueType>
        ValueType any_cast(any&& operand);
     
      template<class ValueType>
        const ValueType* any_cast(const any* operand) noexcept;
      template<class ValueType>
        ValueType* any_cast(any* operand) noexcept;
     
    } // namespace fundamentals_v1
    } // namespace experimental
    } // namespace std
```